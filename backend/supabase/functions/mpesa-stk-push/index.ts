import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { success, error } from '../shared/response.ts'

serve(async (req) => {

  try {
    //step 1: copying the token generated from the mpesa-token function
    const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY");
    const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET_KEY");

    console.log("CONSUMER KEY",consumerKey)
    console.log("CONSUMER SECRET",consumerSecret)
    
   if(!consumerKey || !consumerSecret){
      return error("Missing env credentials", 500)
      }

    //encoding the consumerkey+consumerSecret into base64 to be used in M-pesa's Basic Auth process
    const auth = btoa(`${consumerKey}:${consumerSecret}`);  
    const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", 
      {
       method: "GET",
       headers: {
        Authorization:`Basic ${auth}`,
       },
    })

    if(!tokenRes.ok){
      const msg = await tokenRes.text();
      return error(`M-PESA OAuth request failed: ${tokenRes.status} ${msg}`, tokenRes.status)
    }
     const tokenData = await tokenRes.json();
     const accessToken = tokenData.access_token;

//step 2: Get STK PUSH inputs from the request body
    const body = await req.json()
    const { amount, phoneNumber, accountReference, transactionDesc } = body;

    if(!amount || !phoneNumber || !accountReference || !transactionDesc){
      return error("Missing required fields: amount, phoneNumber, accountReference, transactionDesc")
    }
//step 3: Get the .env vars for the STK PUSH
    const shortcode = Deno.env.get("MPESA_SHORTCODE");
    const passkey = Deno.env.get("MPESA_PASSKEY");
    const callbackUrl = Deno.env.get("MPESA_CALLBACK_URL");

    console.log("MPESA_SHORTCODE",shortcode);

    if(!shortcode || !passkey || !callbackUrl){
      return error("Missing STK env credentials", 500)
    }
 //step 4: Generate timestamp(YYYYMMDDHHmmss)   
    const now = new Date();
    const timestamp = now. getFullYear().toString() + 
       (now.getMonth()+1).toString().padStart(2, '0') +
       now.getDate().toString().padStart(2, '0') +
       now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');

 // step 5: Generate password (Base64(shortcode + passkey + timestamp))     
    const password = btoa(`${shortcode}${passkey}${timestamp}`);
 
 // step 6: Build req body
    const stkBody = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

// step 7: Send STK Push request
   const stkRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", 
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
       "Content-Type": "application/json"
      },
      body: JSON.stringify(stkBody),
    }
   )    

   if(!stkRes.ok){
    const msg = await stkRes.text()
    return error(`STK Push failed: ${stkRes.status} ${msg}`,stkRes.status)
    }
    const stkData = await stkRes.json();
    return success(stkData);

  } catch (err) {
    console.error("STK Push error:", err);
    return error(`Unexpected error: ${err.message}`, 500);
  }
})


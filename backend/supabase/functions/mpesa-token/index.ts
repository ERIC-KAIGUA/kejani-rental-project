// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs

import "https://deno.land/x/dotenv/load.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { success, error } from '../shared/response.ts'



serve(async(req)=>{
  try {
    const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY");
    const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET_KEY");

    console.log("CONSUMER KEY",consumerKey)
    console.log("CONSUMER SECRET",consumerSecret)

    if(!consumerKey || !consumerSecret){
      return error("Missing env credentials", 500)
    }

    //encoding the consumerkey+consumerSecret into base64 to be used in M-pesa's Basic Auth process
    const auth = btoa(`${consumerKey}:${consumerSecret}`);

    // function for getting the access token from MPESA
    const res = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      })

      if(!res.ok){
        const msg = await res.text();
        return error(`M-PESA OAuth request failed: ${res.status} ${msg}`, res.status)
      }

      const data = await res.json();

      return success({
        access_token: data.access_token,
        expires_in:data.expires_in,
        generated_at: new Date().toISOString(),
      })
  } catch (err) {
    console.error("Token generated failed:", err);
    return error(`Unexpected error: ${err.message}`, 500)
    
  }
})


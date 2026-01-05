  const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import crypto from "node:crypto";


serve(async(req)=>{
   if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { phoneNumber, verificationCode } = await req.json();

    if( !phoneNumber || !verificationCode ){
      return new Response(
        JSON.stringify({error: "Phone number and verification code are both required"}),
        { status: 400, headers: corsHeaders }
      )
    }
  
    const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        ); 

     const { data, error } = await supabase
     .from("verifications")
     .select("*")
     .eq("phone",phoneNumber)
     .single();
     
     if(error || !data) {
      return new Response(
        JSON.stringify({error:"Verification record not found"}),
        { status : 400, headers: corsHeaders }
      );
     }
     if(new Date(data.expires_at)< new Date()) {
      return new Response(
        JSON.stringify({error: "Verification code expired"}),
        { status: 400, headers: corsHeaders }
      )
     }
     const hash = crypto
     .createHash("sha256")
     .update(verificationCode.toString())
     .digest("hex");

     if(hash !== data.otp_hash){
      return new Response(
        JSON.stringify({error: "Invalid verification code"}),
        { status: 400, headers: corsHeaders }
      )
     }
   //Mark as verified
   await supabase
   .from("verifications")
   .update({ verified_at: new Date().toISOString() })
   .eq("phone", phoneNumber);
   
   return new Response(
    JSON.stringify({ success:true }),
    { status:200, headers: corsHeaders }
   );
  } catch (err) {
   console.error(err);
   return new Response(
    JSON.stringify({error: "Invalid Request "}),
    { status: 400, headers: corsHeaders }
   ) 
  }
})

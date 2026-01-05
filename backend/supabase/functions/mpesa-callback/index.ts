import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async(req)=>{
  const payload = await req.json();
  console.log("M-PESA CALLBACK RECEIVED:", JSON.stringify(payload,null,2))


  return new Response(JSON.stringify({status:"success"}), 
       {
         headers: {"Content-Type": "application.json"},
         status:200,
       });
});

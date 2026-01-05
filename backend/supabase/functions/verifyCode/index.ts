import { serve } from "https://deno.land/std/http/server.ts";

serve(async(req)=>{
   const { phoneNumber, code } = await req.json();


   const { data , error } = await supabase
      .from("verifications")
      .select("*")
      .eq("phone", phoneNumber)
      .eq("code", code)
      .single();


      if(!data){
        return new response(JSON.stringify({ success:false, message: "Invalid Code"}), { status:400} );
      }

      await supabase
      .from("users")
      .update( {phone_verified:true} )
      .eq("phone", phoneNumber);

      return new Response(JSON.stringify({ success:true }), { status:200 })
});

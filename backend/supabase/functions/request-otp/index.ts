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
     const {firstName, lastName, phoneNumber } = await req.json();

     if(!phoneNumber) {
      return new Response(
        JSON.stringify({ error: "Phone Number is required!"}),
        { status: 400, headers: corsHeaders }
      );
     }
// Validation of the phoneNumber
     const phoneRegex = /^\+254\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      console.error("Invalid phone format:", phoneNumber);
      return new Response(
        JSON.stringify({ 
          error: "Phone number must be in format +254XXXXXXXXX" 
        }),
        { status: 400, headers: corsHeaders }
      );
    }

 //Create Supabase client   
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase credentials");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Expiry: 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Save or update verification record
    const { error: dbError } = await supabase
      .from("verifications")
      .upsert({
        phone: phoneNumber,
        otp_hash: otpHash,
        expires_at: expiresAt,
        verified_at: null,
      }, {
        onConflict: 'phone' // Update if phone already exists
      });

    if (dbError) {
      console.error("❌ Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save OTP" }),
        { status: 500, headers: corsHeaders }
      );
    }

    console.log("OTP saved to database");

    // Get Africa's Talking credentials
    const username = Deno.env.get("AFRICASTALKING_USERNAME");
    const apikey = Deno.env.get("AFRICASTALKING_API_KEY");

    // TEMPORARY DEBUG: Hardcode values if env vars are empty
    // TODO: Remove this after fixing environment variables!
    if (!username) {
      console.warn("⚠️ AFRICASTALKING_USERNAME not found, using hardcoded value");
      username = "sandbox"; // Replace with your actual username
    }
    if (!apikey) {
      console.warn("⚠️ AFRICASTALKING_API_KEY not found, using hardcoded value");
    }

    console.log("🔑 Checking Africa's Talking credentials...");
    console.log("Username exists:", !!username);
    console.log("API Key exists:", !!apikey);
    console.log("Username value:", username || "NOT SET");
    console.log("API Key length:", apikey?.length || 0);

    if (!username || !apikey) {
      console.error("❌ Missing Africa's Talking credentials");
      return new Response(
        JSON.stringify({
          error: "SMS service not configured properly. Please set AFRICASTALKING_USERNAME and AFRICASTALKING_API_KEY",
          details: {
            username: !!username,
            apiKey: !!apikey,
          },
        }),
        { status: 500, headers: corsHeaders }
      );
    }


    if (!username || !apikey) {
      console.error("❌ Missing Africa's Talking credentials");
      return new Response(
        JSON.stringify({ error: "SMS service not configured" }),
        { status: 500, headers: corsHeaders }
      );
    }

    console.log("📱 Sending SMS to:", phoneNumber);
    console.log("AT Username:", username);

    // Determine the correct endpoint based on username
    const isProduction = username !== "sandbox";
    const endpoint = isProduction
      ? "https://api.africastalking.com/version1/messaging"
      : "https://api.sandbox.africastalking.com/version1/messaging";

    console.log("🌐 Using endpoint:", endpoint);

    // Send SMS via Africa's Talking
    const smsResponse = await fetch(endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "apiKey": apikey,
          "Accept": "application/json",
        },
        body: new URLSearchParams({
          username: username,
          from: "AFRICASTKNG",
          to: phoneNumber,
          message: `Hello, your verification code is ${otp}. It expires in 5 minutes.`,
        }),
      }
    );

    // Get response body for debugging
    const smsBody = await smsResponse.text();
    console.log("📨 SMS Response Status:", smsResponse.status);
    console.log("📨 SMS Response Body:", smsBody);

    if (!smsResponse.ok) {
      console.error("❌ SMS sending failed:", smsBody);
      return new Response(
        JSON.stringify({ 
          error: `Failed to send SMS: ${smsBody}` 
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    let smsData;
    try {
      smsData = JSON.parse(smsBody);
    } catch (e) {
      console.error("❌ Failed to parse SMS response:", e);
    }

    if (smsData?.SMSMessageData?.Recipients?.[0]?.status !== "Success") {
      console.error("❌ SMS not delivered:", smsData);
      return new Response(
        JSON.stringify({ 
          error: "SMS could not be delivered. Please check the phone number." 
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    console.log("✅ SMS sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Verification code sent successfully" 
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return new Response(
      JSON.stringify({ 
        error: "Invalid request", 
        details: err.message 
      }),
      { status: 400, headers: corsHeaders }
    );
  }
});
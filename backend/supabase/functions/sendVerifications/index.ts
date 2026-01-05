
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase1 } from "../../services/supabaseEdgeClient.js";

const AFRICAS_TALKING_API_KEY = Deno.env.get("AFRICASTALKING_API_KEY");
const AFRICAS_TALKING_USERNAME = Deno.env.get("AFRICASTALKING_USERNAME");
const SMS_SHORTCODE = "YOUR_SHORTCODE";

serve(async (req) => {
  try {
    // ✅ Validate request method
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ success: false, error: "Only POST requests allowed" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Parse body safely
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { phoneNumber } = body;
    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing phoneNumber" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Insert into database
    const { error: dbError } = await supabase1
      .from("verifications")
      .insert([{ phone: phoneNumber, code, created_at: new Date() }]);

    if (dbError) {
      console.error("Database Error:", dbError);
      return new Response(
        JSON.stringify({ success: false, error: "Database insert failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Send SMS via Africa's Talking
    const smsResponse = await fetch("https://api.africastalking.com/version1/messaging", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "apiKey": AFRICAS_TALKING_API_KEY!,
      },
      body: new URLSearchParams({
        username: AFRICAS_TALKING_USERNAME!,
        to: phoneNumber,
        message: `Your verification code is ${code}. It expires in 5 minutes.`,
        from: SMS_SHORTCODE,
      }),
    });

    if (!smsResponse.ok) {
      const errText = await smsResponse.text();
      console.error("Africa's Talking Error:", errText);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send SMS" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await smsResponse.json();

    // ✅ Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification code sent successfully",
        result,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    // ✅ Catch unexpected errors
    console.error("Unexpected Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});



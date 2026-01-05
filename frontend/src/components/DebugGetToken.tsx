import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

/**
 * This component is ONLY for development/testing.
 * It safely gets your Clerk JWT and displays it in a modal-like box.
 */
export default function DebugGetToken() {
  const { getToken, isSignedIn } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetToken = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!isSignedIn) {
        setError("You must be signed in with Clerk to get a token.");
        setLoading(false);
        return;
      }

      // "supabase" must match your Clerk JWT template name if you created one
      const jwt = await getToken({ template: "supabase" });
      if (!jwt) throw new Error("No token returned. Check Clerk settings.");
      
      setToken(jwt);
      await navigator.clipboard.writeText(jwt);
      alert("✅ Token copied to clipboard (also shown below).");
    } catch (err: any) {
      console.error("Error getting Clerk token:", err);
      setError(err.message || "Failed to get token. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100 mt-4 text-center">
      <h2 className="font-semibold text-gray-700 mb-2">
        Debug: Get Clerk JWT
      </h2>

      <button
        onClick={handleGetToken}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Fetching..." : "Get JWT"}
      </button>

      {error && (
        <p className="text-red-600 mt-2 text-sm">
          ⚠️ {error}
        </p>
      )}

      {token && (
        <textarea
          readOnly
          className="w-full mt-3 p-2 text-xs border rounded bg-gray-50"
          rows={5}
          value={token}
        />
      )}
    </div>
  );
}

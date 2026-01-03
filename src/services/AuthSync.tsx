// src/components/AuthSync.tsx
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { syncUserToSupabase } from "./userRoute";

export function AuthSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      syncUserToSupabase(user);
    }
  }, [isLoaded, user]);
   console.log(user)
     console.log(isLoaded)
  return null; 
}


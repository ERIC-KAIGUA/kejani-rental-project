import supabase from "../config/supabaseClient";

export const syncUserToSupabase = async(clerkUser) => {
    const{id,fullName,emailAddresses} = clerkUser;

    const { error } = await supabase
    .from("users")
    .upsert([
        {
            clerkUserId:id,
            fullName:fullName,
            email:emailAddresses[0]?.emailAddress,
        },
    ])
    if(error) console.error("User Sync Error!:", error);
    else console.log("✅ User synced to Database")
} 
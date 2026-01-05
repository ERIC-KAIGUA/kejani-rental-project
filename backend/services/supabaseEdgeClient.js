import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const supabaseServiceRolekey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const supabase1 = createClient(SUPABASE_URL, supabaseServiceRolekey)

export default supabase1
    

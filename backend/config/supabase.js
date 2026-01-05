import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config()

const supabaseUrl = process.env.KEJANI_PROJECT_URL
const supabaseKey = process.env.KEJANI_API_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials not found. Make sure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_KEY are set in your environment.");
}

/** @type {import('@supabase/supabase-js').SupabaseClient} */
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : /** @type {any} */ (new Proxy({}, {
      get() {
        throw new Error("Supabase client is not initialized because SUPABASE_URL or SUPABASE_KEY is missing in your environment.");
      }
    }));

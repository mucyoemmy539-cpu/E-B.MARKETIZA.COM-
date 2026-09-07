// E&B MARKETIZA configuration.
// For real accounts, create a Supabase project and replace these two values.
// Do NOT put a service_role/secret key here. Only the public anon key belongs in browser code.
export const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
export const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";
export const SUPABASE_READY =
  SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  !SUPABASE_ANON_KEY.includes("YOUR_PUBLIC");

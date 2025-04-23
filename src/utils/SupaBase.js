import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

// 環境変数の取得
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log(SUPABASE_URL);
console.log(SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://npzpracrghkabvjosvny.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wenByYWNyZ2hrYWJ2am9zdm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxOTYyNjcsImV4cCI6MjA5MTc3MjI2N30.Ut3A65dvLdkX2EvhZmI9Y5NFPeFEe3-1nIdJ4cwi6dc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

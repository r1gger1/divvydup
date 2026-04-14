import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bvuzrhmqcrepsevkdutt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dXpyaG1xY3JlcHNldmtkdXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMDcwMDMsImV4cCI6MjA5MTc4MzAwM30.9Ll1c7_hIw5Czksc9h0Sd2Hhf_tOlSLmbdTv9x64Yrk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

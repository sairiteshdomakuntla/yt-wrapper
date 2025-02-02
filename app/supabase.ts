import { createClient } from "@supabase/supabase-js";
const supabaseUrl='https://azzqcmmlemdmpnbwxzit.supabase.co';
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6enFjbW1sZW1kbXBuYnd4eml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTAyNTYsImV4cCI6MjA1MjE2NjI1Nn0.0YgTs4yylKplLufVOYzJJR0w1-G-7c6DhRMGR9ORUUI';
export const supabase=createClient(supabaseUrl, supabaseKey)
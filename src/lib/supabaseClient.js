import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://amgumkibzglkdsviaznq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3Vta2liemdsa2Rzdmlhem5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NTA4MjcsImV4cCI6MjA5MjIyNjgyN30.ebwZHR4HhDZy2afWxkmbUw5fO31G9lU1cbYb83q4lHg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

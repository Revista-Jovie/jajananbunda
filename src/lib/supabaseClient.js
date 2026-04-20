import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kblnllmearihyvimywbf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtibG5sbG1lYXJpaHl2aW15d2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NTUxNTIsImV4cCI6MjA2NTUzMTE1Mn0.diT3R56uOHrrcfEISiwR-bEMj5FxGFSfv9sRAANYTxA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

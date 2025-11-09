import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kztnxryxtdvqhxsqgdyk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dG54cnl4dGR2cWh4c3FnZHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTAyNjYsImV4cCI6MjA3ODE4NjI2Nn0.XQcwmjVYHYHpWpcoE0UGjdONigsjEQ3P75Ligp2y6Cg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

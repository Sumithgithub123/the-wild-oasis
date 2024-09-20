import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wyhtgfvyivwphnlueyas.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aHRnZnZ5aXZ3cGhubHVleWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwNTgyMTksImV4cCI6MjAzNjYzNDIxOX0.Yqc4hyT6gGy3-CronnIFqEXaPV5RTfYUqd_jzwHrC-4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

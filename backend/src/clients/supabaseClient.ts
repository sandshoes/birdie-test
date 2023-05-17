import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lsflszamxexhizovwscj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZmxzemFteGV4aGl6b3Z3c2NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5MDc4NjQsImV4cCI6MTk5OTQ4Mzg2NH0.HyzpiHLfiaGkrh5TV-eCc55450y_TYEtwCsZ9z6MGAA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

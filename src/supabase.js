import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jgggerucyznojtgokcfw.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZ2dlcnVjeXpub2p0Z29rY2Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MDA1MTQsImV4cCI6MjA2MTE3NjUxNH0.U5Hh-pPC8AZwQXtYlRvMrGtbXzB6PHggsyyKJP2HhI8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

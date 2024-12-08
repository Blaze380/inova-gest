import { createClient } from '@supabase/supabase-js';

// Substitua pelos valores do seu projeto no Supabase
const supabaseUrl:string | undefined = process.env.SUPABASE_URL as string;
const supabaseKey:string  | undefined= process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import supabase from "@/lib/supabase";

export async function GET(_req:Request,{params}:{params:{jwt:string}}):Promise<Response>{
    const {data,error} =await supabase.auth.getUser(params.jwt);
    if(error) return new Response(JSON.stringify(error));
    return new Response(JSON.stringify(data));
}
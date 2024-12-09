import supabase from '@/lib/supabase';
export async function GET(_req:Request,{params}:{params:{id:string}}):Promise<Response>{

    const {data ,error}=await supabase.from('provinces').select("*").eq('id', params.id);
    if(error) return new Response(JSON.stringify(error,null,5));
    return new Response(JSON.stringify(data,null,5));
}
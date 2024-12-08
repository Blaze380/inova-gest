import supabase from '@/lib/supabase';
import {Province} from '@/types/entities';
export async function POST(req:Request){
    const province:Province = await req.json();

    const {data ,error}=await supabase
    .from('provinces')
    .insert([{
            province_name:province.provinceName
        }]);

    if(error)throw new Error(JSON.stringify(error,null,3));
    return new Response(JSON.stringify(data));

}
export async function GET(req:Request){
    const size:string | null =new URL(req.url).searchParams.get('size');

    const {data ,error}=await supabase.from('provinces').select("*").limit(parseInt(size as string));

    if(error)throw new Error(JSON.stringify(error,null,3));
    return new Response(JSON.stringify(data));
}


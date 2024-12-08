import supabase from "@/lib/supabase";

export async function POST (req: Request): Promise<Response> {
    const { email, password } = await req.json();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    if (error) return new Response(JSON.stringify(error));

    return new Response(JSON.stringify({
        access_token: data.session?.access_token,
    }))
}
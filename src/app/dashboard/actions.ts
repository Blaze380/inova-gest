"use server";

import supabase from "@/lib/supabase";

export async function getUserData ({ jwt }: { jwt: string }) {
    const res = await supabase.auth.getUser(jwt);
    return JSON.stringify(res);
}
"use server";

import supabase from "@/lib/supabase";
import { UserResponse } from "@supabase/supabase-js";

export async function getUserData ({ jwt }: { jwt: string }) {
    const res = await supabase.auth.getUser(jwt);
    return JSON.stringify(res);
}
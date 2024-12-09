import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface SupabaseResponse {
  __isAuthError: true;
  name: string | SupabaseErroName;
  status: 0;
}
export type SupabaseErroName = 'AuthRetryableFetchError' |"AuthApiError";


export class Fetch {
  public static async post (url: string, data: unknown, token?: string): Promise<Response> {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${ token }` : "",
      },
      body: JSON.stringify(data),

    });
  }

  public static async getWithPathVariable (url: string,variable:string): Promise<Response> {
    return await fetch(`${url}/${variable}`);
  }
}
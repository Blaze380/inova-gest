"use client";
import FormInput from "@/components/FormInput";
import { Fetch, SupabaseErroName } from "@/lib/utils";
import { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import LoadingButton from "@/components/LoadingButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useToast } from "@/hooks/use-toast"
import { SupabaseAuth } from "@/lib/supabase";
import LabeledTitle from "@/components/LabeledTitle";


interface FormData { email: string, password: string };
export default function SignIn (): ReactElement {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();
    const router: AppRouterInstance = useRouter();
    useEffect((): void => {
        setIsLoading(true);
        if (isLogged())
            router.push("/dashboard");
        setIsLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function submitData (e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setIsLoading(true);
        try {
            requestSignIn();
        } catch (error) {
            if (error)
                toast.toast({
                    title: "Erro",
                    variant: "destructive",
                    description: "Algo deu errado, recarregue a página",
                });
            console.log(error);
        }




    }
    async function requestSignIn (): Promise<void> {
        const res: Response = await Fetch.post("../api/v1/auth/signin", getFormData());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await res.json();
        console.log(data)
        if (res.status !== 200)
            throw new Error(data);

        if (data.accessToken) {
            localStorage.setItem("auth", JSON.stringify(data));
            router.push("/dashboard");
            return;
        }

        if (data.__isAuthError === true) {
            if (data.name === "AuthApiError" as SupabaseErroName)
                toast.toast({
                    title: "Erro ao fazer login",
                    variant: "destructive",
                    description: "Email ou senha incorretos. Por favor tente novamente.",
                });
            else if (data.name === "AuthRetryableFetchError" as SupabaseErroName)
                toast.toast({
                    title: "Erro de conexão",
                    variant: "destructive",
                    description: "Verifique a sua conexão.",
                });
            else
                toast.toast({
                    title: "Erro desconhecido",
                    variant: "destructive",
                    description: "A validação de dados não ocorreu como esperado.",
                });



            setIsLoading(false);
            return;
        }
        throw new Error(JSON.stringify({
            error: "AUTENTICACAO_INVALIDA_NAO_ESPERADA",
            message: "Error not expected, supposed to be incorrect credentials"
        }, null, 2));


    }
    function getFormData (): FormData {
        return {
            email: email,
            password: password
        };
    }
    return (
        <div className="w-full h-full " onSubmit={(e) => e.preventDefault()}>
            <main className="w-full h-full border  flex justify-around items-center max-md:flex-col ">
                <LabeledTitle
                    title="Bem-vindo de volta a"
                    description="Entre para gerenciar os imóveis da sua empresa!" />
                <form className="p-6 w-96 shadow-md dark:border dark:border-smooth-fg dark:rounded-md" onSubmit={(e: FormEvent<HTMLFormElement>): Promise<void> => submitData(e)}>
                    <div className="flex flex-col items-center justify-center w-full space-y-5">
                        <LabeledTitle
                            title="Login"
                            description="Faça o login para poder aceder ao dashboard da InovaGest." />
                        <FormInput className="w-full h-10" type="email" labelText="Email:" required placeholder="Ex:admin@blaze.tech" value={email} onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)} />
                        <FormInput className="w-full h-10" type="password" labelText="Senha:" required placeholder="******" value={password} onChange={(e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)} />
                        <LoadingButton className="w-full h-10 " isLoading={isLoading} >Entrar</LoadingButton>
                    </div>
                </form>
            </main>
        </div>
    );
}

function isLogged (): boolean {
    const data: string | null = localStorage.getItem("auth");
    if (!data) return false;
    const { expiresAt, ...auth } = JSON.parse(data) as SupabaseAuth;

    if (!auth.accessToken) return false;

    const MILLISECONDS_IN_SECOND = 1000;
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    //const HOURS_IN_DAY = 24;

    // Conversão para dias
    const MILLISECONDS_IN_HOUR: number = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;

    const currentTime: number = Date.now();

    const expiresAtDate = new Date(expiresAt * 1000);
    const currentDate = new Date(currentTime);

    // Calcula a diferença em dias
    const differenceInTime = expiresAtDate.getTime() - currentDate.getTime();
    const differenceInHours = Math.floor(differenceInTime / MILLISECONDS_IN_HOUR);

    if (differenceInHours > 0 || differenceInHours === 0)
        return true;
    return false;



}
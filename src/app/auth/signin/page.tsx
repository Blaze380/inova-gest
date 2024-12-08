"use client";
import FormInput from "@/components/FormInput";
import { Fetch } from "@/lib/utils";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useRouter } from 'next/navigation';
import LoadingButton from "@/components/LoadingButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useToast } from "@/hooks/use-toast"


interface FormData{ email: string, password: string };
export default function SignIn (): ReactElement {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast =useToast();
    const router: AppRouterInstance = useRouter();

    async function submitData (e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setIsLoading(true);
        try {
            requestSignIn();
        } catch (error) {
            if(error)
            toast.toast({
                title: "Erro",
                variant:"destructive",
                description:"Algo deu errado, recarregue a página",
            });
            console.log(error);
        }




    }
    async function requestSignIn():Promise<void>{
        const res: Response = await Fetch.post("../api/v1/auth/signin", getFormData());
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const data :any= await res.json();
        console.log(res.status)
         console.log(data)
         if(res.status !== 200)
            throw new Error(data);
        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            router.push("/dashboard");
            return;
        }
        if(data.name)
         if(data.name==="AuthApiError"){
            console.log("first")
            toast.toast({
                title: "Erro ao fazer login",
                variant:"destructive",
                description:"Email ou senha incorretos. Por favor tente novamente.",
            });
            setIsLoading(false);
            return;
         }
         throw new Error("Erro not expected, suposed to be incorrect credentials")


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
                <div className="flex flex-col text-center space-y-4">
                    <h1 className="text-4xl font-bold">Bem-vindo de volta a <span className="bg-black rounded-sm text-white p-3 mt-1 pt-2 pb-2">InovaGest</span></h1>
                    <p className="text-slate-700">Entre para gerenciar os imóveis da sua empresa!</p>
                </div>
                <form className="p-6 w-96 shadow-md" onSubmit={(e: FormEvent<HTMLFormElement>): Promise<void> => submitData(e)}>
                    <div className="flex flex-col items-center justify-center w-full space-y-5">
                        <div className="flex flex-col justify-start mb-4">
                            <h2 className="text-3xl font-bold">Login</h2>
                            <p className="text-slate-700">Faça o login para poder aceder ao dashboard da InovaGest.</p>
                        </div>
                        <FormInput className="w-full h-10" type="email" labelText="Email:"  required placeholder="Ex:admin@blaze.tech" value={email} onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)} />
                        <FormInput className="w-full h-10" type="password" labelText="Senha:"  required placeholder="******" value={password} onChange={(e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)} />
                        <LoadingButton className="w-full h-10 text-white" isLoading={isLoading} >Entrar</LoadingButton>
                    </div>
                </form>
            </main>
        </div>
    );
}
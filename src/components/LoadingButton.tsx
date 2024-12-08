import { ButtonHTMLAttributes, ReactElement,  } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from 'lucide-react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading?:boolean;
}
export default function LoadingButton (props:LoadingButtonProps ): ReactElement {
    const { className,children,isLoading,...btnProps}=props;
    return (
        <Button className={`${className} p-1`} disabled={isLoading} {...btnProps}>
            {isLoading && <LoaderCircle size={50} className="animate-spin w-7 h-7" />}
            {children}
        </Button>
    );
}

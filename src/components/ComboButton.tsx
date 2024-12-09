import { ButtonHTMLAttributes, ReactElement, } from "react";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
type ComboProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isButton?: boolean;
}

export default function ComboButton ({ children, className, isButton, ...props }: ComboProps): ReactElement {
    return (
        <Button variant="ghost" {...props} className={`w-full  h-full p-2 ${ className }`}>
            {children}
            {isButton && (
                <div className="w-[10%]">
                    <ChevronsUpDown />
                </div>
            )}
        </Button>
    )
}
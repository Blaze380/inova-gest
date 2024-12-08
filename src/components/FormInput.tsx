import { InputHTMLAttributes, ReactElement } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
interface FormInputProps {
    className?: InputHTMLAttributes<HTMLInputElement>["className"];
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
    value?: InputHTMLAttributes<HTMLInputElement>["value"];
    onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
    required?:InputHTMLAttributes<HTMLInputElement>["required"];
    name?: InputHTMLAttributes<HTMLInputElement>["name"];
    labelText?: string;
}

export default function FormInput (props: FormInputProps): ReactElement {
    const { labelText, ...inputProps } = props;
    return (
        <div className="w-full">
            <Label className="font-semibold">{labelText}</Label>
            <Input {...inputProps} />
        </div>
    );
}
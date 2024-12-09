import { BaseHTMLAttributes, ReactElement } from "react";

interface LabeledTitleProps {
    title: string;
    description?: string;
    className?:BaseHTMLAttributes<HTMLDivElement>["className"];
}
export default function LabeledTitle ({ description, title,className }: LabeledTitleProps): ReactElement {
    return (
        <div className={`flex flex-col justify-start mb-4 ${className}`}>
            <h2 className="text-3xl font-bold">{title}</h2>
            {description && <p className="text-smooth-fg dark:text-smooth-fg-dark">{description}</p>}
        </div>
    )
}
import { ReactElement } from "react";
import "tailwindcss";

interface ButtonProps {
    varient: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const varientStyles = {
    primary: "bg-blue-800 hover:bg-blue-900 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
};

const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-1.5 text-base",
    lg: "px-6 py-3 text-lg"
};

const defaultStyles = "rounded-md flex"


export const Button = (props: ButtonProps) => {
    
    return (
        <button className={`${varientStyles[props.varient]} ${defaultStyles} ${sizeStyles[props.size]}`}>
            {props.startIcon ? <div className="pr-2">{props.startIcon} </div> :null}
            {props.text}
            {/* {props.endIcon} */}
        </button>
    );
}
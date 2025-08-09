import React from "react";
import {twMerge} from 'tailwind-merge';
import clsx from "clsx";

const Button = ({children,onClick,className="",type="button"})=>{
    const baseClasses = "px-4 py-2 font-semibold bg-primary text-white rounded-full hover:bg-accent text-sm transition duration-200";

    return(
        <button
            type={type}
            onClick={onClick}
            className={twMerge(clsx(baseClasses,className))}
        >
            {children}
        </button>
    )
}

export default Button;
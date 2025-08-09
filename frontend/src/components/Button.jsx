import {twMerge} from 'tailwind-merge';
import clsx from "clsx";

const Button = ({children,onClick,className="",type="button", icon:Icon})=>{
    const baseClasses = "px-4 py-2 font-semibold bg-primary text-white rounded-full hover:bg-accent text-sm transition duration-200 flex items-center gap-2";

    return(
        <button
            type={type}
            onClick={onClick}
            className={twMerge(clsx(baseClasses,className))}
        >
            {Icon && <Icon className="text-xl"/>}
            {children} 
        </button>
    )
}

export default Button;
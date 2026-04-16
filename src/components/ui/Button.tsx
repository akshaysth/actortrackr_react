
import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs.filter(Boolean)));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;

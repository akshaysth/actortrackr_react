import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs.filter(Boolean)));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-white shadow-md rounded-lg p-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Card;

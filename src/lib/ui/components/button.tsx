import { ButtonHTMLAttributes } from "react";
import { cn } from "../utils";

type ButtonProps = {
  variant?: "ghost" | "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({ variant, children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-[50px] px-3 py-1 text-white",
        className,
        variant === "ghost" &&
          "bg-white text-black hover:bg-backgroundHighlight/80",
        variant === "primary" && "bg-primary hover:bg-primary/90",
        variant === "secondary" && "bg-backgroundHighlight text-black"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

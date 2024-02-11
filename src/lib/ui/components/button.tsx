import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils";

type ButtonProps = {
  variant?: "ghost" | "primary" | "secondary";
  size?: "small" | "normal";
} & ButtonHTMLAttributes<HTMLButtonElement>;
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, children, className, size = "normal", ...rest }: ButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-[50px] px-4 py-1 text-white text-[14px] flex justify-center items-center disabled:opacity-25 disabled:cursor-not-allowed",
          className,
          variant === "ghost" &&
            "bg-white text-black hover:bg-backgroundHighlight/80",
          variant === "primary" && "bg-primary hover:bg-primary/80",
          variant === "secondary" &&
            "bg-secondary text-black hover:bg-secondary/80",
          size === "small" && "w-[34px] h-[34px] rounded-[4px] p-0"
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;

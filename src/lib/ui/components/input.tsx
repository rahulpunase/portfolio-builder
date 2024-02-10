import { InputHTMLAttributes } from "react";
import { cn } from "../utils";

type InputProps = {} & InputHTMLAttributes<HTMLInputElement>;
const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      className={cn(
        "outline-none bg-transparent placeholder:text-editorPlaceholder",
        className
      )}
    />
  );
};

export default Input;

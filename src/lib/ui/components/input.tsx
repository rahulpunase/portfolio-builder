import { InputHTMLAttributes } from "react";
import { cn } from "../utils";

type InputProps = {
  isInPreviewMode: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
const Input = ({
  className,
  isInPreviewMode,
  defaultValue,
  ...rest
}: InputProps) => {
  return isInPreviewMode ? (
    <div className={className}>{defaultValue}</div>
  ) : (
    <input
      {...rest}
      defaultValue={defaultValue}
      className={cn(
        "outline-none bg-transparent placeholder:text-editorPlaceholder",
        className
      )}
    />
  );
};

export default Input;

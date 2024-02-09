import React, { TextareaHTMLAttributes } from "react";
import { cn } from "../utils";

type TextAreaProps = {} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ children, className, ...rest }: TextAreaProps) => {
  return (
    <textarea className={cn("outline-none", className)} {...rest}>
      {children}
    </textarea>
  );
};

export default TextArea;

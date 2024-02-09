import Button from "@/lib/ui/components/button";
import { cn } from "@/lib/ui/utils";
import { useState } from "react";

const withSectionHOC = (WrapperComponent: () => JSX.Element) => {
  return function () {
    const [isComponentInFocus, setIsComponentInFocus] = useState(false);

    const editorOnFocus = () => {
      setIsComponentInFocus(true);
    };

    const editorOnBlur = () => {
      setIsComponentInFocus(false);
    };

    return (
      <div className="relative group group-hover:bg-white mb-10">
        {isComponentInFocus && (
          <div className="flex items-center justify-end mb-2">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save</Button>
          </div>
        )}
        <div
          className={cn(
            "rounded-[16px] p-4",
            isComponentInFocus && "border border-border-dark"
          )}
        >
          <WrapperComponent onFocus={editorOnFocus} onBlur={editorOnBlur} />
        </div>
      </div>
    );
  };
};

export default withSectionHOC;

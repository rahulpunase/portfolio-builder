import Button from "@/lib/ui/components/button";
import { cn } from "@/lib/ui/utils";
import { AlignJustify, Pencil, Trash } from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  createRef,
  useEffect,
  useState,
} from "react";

export type WrappedProps = {
  onFocus: () => void;
  onBlur: () => void;
  isSectionInEditMode: boolean;
  ref: React.RefObject<unknown>;
};

export type WrappedRef = {
  onSaveHandler: () => void;
};
export type WrappedComponentOfHOC = ForwardRefExoticComponent<
  Omit<WrappedProps, "ref"> & RefAttributes<WrappedRef>
>;

const withSectionHOC = (WrappedComponent: WrappedComponentOfHOC) => () => {
  // const [isComponentInFocus, setIsComponentInFocus] = useState(false);

  const [isSectionInEditMode, setSectionInEditMode] = useState(false);
  const ref = createRef<WrappedRef>();

  const editorOnFocus = () => {
    // setIsComponentInFocus(true);
  };

  const editorOnBlur = () => {
    // setIsComponentInFocus(false);
  };

  const onCancelHandler = () => {
    setSectionInEditMode(false);
  };

  const onSaveHandler = () => {
    if (!ref.current) return;
    ref.current.onSaveHandler();
  };

  useEffect(() => {
    setSectionInEditMode(true);
  }, []);

  return (
    <div className="relative group mb-32">
      {isSectionInEditMode && (
        <div className="flex absolute w-full left-0 translate-y-[-100%] pb-2 items-center gap-x-2 justify-end mb-2">
          <Button variant="ghost" onClick={onCancelHandler}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSaveHandler}>
            Save
          </Button>
        </div>
      )}
      {!isSectionInEditMode && (
        <div className="hidden group-hover:flex absolute w-full left-0 translate-y-[-100%] pb-2 items-center gap-x-2 justify-between mb-2">
          <div>
            <Button size="small" variant="secondary">
              <AlignJustify className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-row gap-x-2">
            <Button size="small" variant="secondary">
              <Trash className="w-4 h-4" />
            </Button>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setSectionInEditMode(true)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      <div
        className={cn(
          "rounded-[16px] p-4 border border-transparent group-hover:border-border-dark",
          isSectionInEditMode && "border border-border-dark"
        )}
      >
        <WrappedComponent
          ref={ref}
          onFocus={editorOnFocus}
          onBlur={editorOnBlur}
          isSectionInEditMode={isSectionInEditMode}
        />
      </div>
    </div>
  );
};

export default withSectionHOC;

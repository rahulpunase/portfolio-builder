import { MetaSectionType } from "@/lib/constants";
import Button from "@/lib/ui/components/button";
import { cn } from "@/lib/ui/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteSection, sort } from "@/store/slice/builder";
import { selectSectionList } from "@/store/slice/builder/selectors";
import { MoveDownIcon, MoveUpIcon, Pencil, Trash } from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  createRef,
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

const withSectionHOC =
  (WrappedComponent: WrappedComponentOfHOC) =>
  ({ type }: { type: MetaSectionType }) => {
    // const [isComponentInFocus, setIsComponentInFocus] = useState(false);

    const [isSectionInEditMode, setSectionInEditMode] = useState(false);
    const ref = createRef<WrappedRef>();
    const dispatch = useAppDispatch();

    const list = useAppSelector(selectSectionList);
    const currentSection = list.find((item) => item.type === type);

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
      setSectionInEditMode(false);
    };

    const onDeleteSectionHandler = () => {
      if (!ref.current) return;
      dispatch(
        deleteSection({
          sectionType: type,
        })
      );
    };

    const moveUp = () => {
      dispatch(
        sort({
          dir: "up",
          index: currentSection?.order ?? 0,
        })
      );
    };

    const moveDown = () => {
      dispatch(
        sort({
          dir: "down",
          index: currentSection?.order ?? 0,
        })
      );
    };

    return (
      <div className="relative group">
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
            <div className="flex flex-row">
              <Button
                size="small"
                variant="secondary"
                disabled={currentSection?.order === 0}
                onClick={moveUp}
              >
                <MoveUpIcon className="w-4 h-4" />
              </Button>
              <Button
                size="small"
                variant="secondary"
                disabled={currentSection?.order === list.length - 1}
                onClick={moveDown}
              >
                <MoveDownIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-row gap-x-2">
              <Button
                size="small"
                variant="secondary"
                onClick={onDeleteSectionHandler}
              >
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
            "rounded-[16px] sm:p-8 p-4 border border-transparent group-hover:border-border-dark",
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

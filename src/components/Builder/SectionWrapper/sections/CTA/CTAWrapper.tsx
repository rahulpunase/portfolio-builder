import { forwardRef, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import { useAppDispatch } from "@/store";
// import { saveAboutSection } from "@/store/slice/builder";
import CTAEditor from "./CTAEditor";
import { saveCTASection } from "@/store/slice/builder";

const ExtendibleCTAEditor = forwardRef<WrappedRef, WrappedProps>(
  (props, ref) => {
    const contentRef = useRef<Record<string, string>>({});
    const dispatch = useAppDispatch();

    const onValueChange = (html: string, field: string) => {
      contentRef.current[field] = html;
    };

    useImperativeHandle(ref, () => ({
      onSaveHandler: () => {
        if (!contentRef.current) return;
        dispatch(
          saveCTASection({
            subtext: contentRef.current["subtext"],
            title: contentRef.current["title"],
          })
        );
        console.log(contentRef);
      },
      onDeleteSectionHandler: () => {},
    }));
    return (
      <CTAEditor
        isInPreviewMode={false}
        isSectionInEditMode={props.isSectionInEditMode}
        onValueChange={onValueChange}
      />
    );
  }
);

const CTAWrapper = withSectionHOC(ExtendibleCTAEditor);

export default CTAWrapper;

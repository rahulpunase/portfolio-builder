import { forwardRef, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import RichTextEditor from "./RichTextEditor";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateAboutSection } from "@/store/slice/builder";
import { selectAboutYouSetSection } from "@/store/slice/builder/selectors";

const ExtendibleAboutYouEditor = forwardRef<WrappedRef, WrappedProps>(
  (props, ref) => {
    const contentRef = useRef("");
    const dispatch = useAppDispatch();
    const aboutYouSection = useAppSelector(selectAboutYouSetSection);

    const onValueChange = (html: string) => {
      contentRef.current = html;
    };

    useImperativeHandle(ref, () => ({
      onSaveHandler: () => {
        if (!contentRef.current) return;
        dispatch(
          updateAboutSection({
            html: contentRef.current,
          })
        );
      },
      onDeleteSectionHandler: () => {},
    }));

    return (
      <RichTextEditor
        defaultContent={aboutYouSection?.content}
        onValueChange={onValueChange}
        {...props}
      />
    );
  }
);

const AboutYouWrapper = withSectionHOC(ExtendibleAboutYouEditor);

export default AboutYouWrapper;

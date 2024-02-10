import { forwardRef, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import AboutYouEditor from "./AboutYouEditor";
import type { LexicalEditor } from "lexical";
import { useAppDispatch } from "@/store";
import { updateAboutSection } from "@/store/slice/builder";
import { $generateHtmlFromNodes } from "@lexical/html";

const ExtendibleAboutYouEditor = forwardRef<WrappedRef, WrappedProps>(
  (props, ref) => {
    const editorRef = useRef<LexicalEditor | null>(null);
    const setEditorRef = (_editor: LexicalEditor) => {
      editorRef.current = _editor;
    };
    const dispatch = useAppDispatch();

    useImperativeHandle(ref, () => ({
      onSaveHandler: () => {
        if (!editorRef.current) return;
        editorRef.current.update(() => {
          if (!editorRef.current) return;
          dispatch(
            updateAboutSection({
              html: $generateHtmlFromNodes(editorRef.current),
            })
          );
        });
      },
    }));

    return <AboutYouEditor setEditorRef={setEditorRef} {...props} />;
  }
);

const AboutYou = withSectionHOC(ExtendibleAboutYouEditor);

export default AboutYou;

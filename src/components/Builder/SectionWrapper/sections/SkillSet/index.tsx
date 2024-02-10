import { forwardRef, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import AddNewCard from "./AddNewCard";
import SkillCard from "./SkillCard";
import { LexicalEditor } from "lexical";
import { useAppDispatch } from "@/store";

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
          // dispatch(
          //   // updateAboutSection({
          //   //   html: $generateHtmlFromNodes(editorRef.current),
          //   // })
          // );
        });
      },
    }));

    return (
      <div className="flex w-full flex-wrap flex-row gap-4">
        <SkillCard />
        {props.isSectionInEditMode && <AddNewCard />}
      </div>
    );
  }
);

const SkillSet = withSectionHOC(ExtendibleAboutYouEditor);

export default SkillSet;

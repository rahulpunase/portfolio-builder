import { forwardRef, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import AddNewCard from "./AddNewCard";
import SkillCard from "./SkillCard";
import { LexicalEditor } from "lexical";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectSkillsSetSection } from "@/store/slice/builder/selectors";
import { Skills } from "@/lib/constants";
import { saveSkillSection } from "@/store/slice/builder";

const ExtendibleAboutYouEditor = forwardRef<WrappedRef, WrappedProps>(
  (props, ref) => {
    const editorRef = useRef<LexicalEditor | null>(null);
    const selectSkillSetSection = useAppSelector(selectSkillsSetSection);
    const setEditorRef = (_editor: LexicalEditor) => {
      editorRef.current = _editor;
    };
    const dispatch = useAppDispatch();

    const cardRef = useRef<
      Record<
        string,
        {
          title: string;
          description: string;
          content: string;
        }
      >
    >({});

    const onTitleChange = (value: string, key: string) => {
      if (!cardRef.current) return;
      cardRef.current[key] = {
        ...cardRef.current[key],
        title: value,
      };
    };

    const onDescriptionChange = (value: string, key: string) => {
      if (!cardRef.current) return;
      cardRef.current[key] = {
        ...cardRef.current[key],
        description: value,
      };
    };

    const onContentChange = (value: string, key: string) => {
      if (!cardRef.current) return;
      cardRef.current[key] = {
        ...cardRef.current[key],
        content: value,
      };
      console.log(cardRef);
    };

    useImperativeHandle(ref, () => ({
      onSaveHandler: () => {
        const children: Skills[] = Object.keys(cardRef.current).map((key) => ({
          title: cardRef.current[key].title,
          description: cardRef.current[key].description,
          content: cardRef.current[key].content,
          id: key,
        }));
        dispatch(
          saveSkillSection({
            children,
          })
        );
      },
    }));

    return (
      selectSkillSetSection && (
        <div className="flex w-full flex-wrap flex-row gap-4">
          {selectSkillSetSection.children?.map((item) => (
            <SkillCard
              isSectionInEditMode={props.isSectionInEditMode}
              key={item.id}
              id={item.id}
              onTitleChange={onTitleChange}
              onDescriptionChange={onDescriptionChange}
              onContentChange={onContentChange}
            />
          ))}
          {props.isSectionInEditMode && <AddNewCard />}
        </div>
      )
    );
  }
);

const SkillCardWrapper = withSectionHOC(ExtendibleAboutYouEditor);

export default SkillCardWrapper;

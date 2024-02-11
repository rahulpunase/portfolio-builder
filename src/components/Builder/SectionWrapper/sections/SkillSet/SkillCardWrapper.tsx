import { forwardRef, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import AddNewCard from "./AddNewCard";
import SkillCard from "./SkillCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectSkillsSetSection } from "@/store/slice/builder/selectors";
import { Skills } from "@/lib/constants";
import { saveSkillSection } from "@/store/slice/builder";

const ExtendibleAboutYouEditor = forwardRef<WrappedRef, WrappedProps>(
  (props, ref) => {
    const selectSkillSetSection = useAppSelector(selectSkillsSetSection);
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

    const onValueChange = (value: string, key: string, field: keyof Skills) => {
      if (!cardRef.current) return;
      cardRef.current[key] = {
        ...cardRef.current[key],
        [field]: value,
      };
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
              onValueChange={onValueChange}
              data={item}
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

import { forwardRef, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectExperienceSection } from "@/store/slice/builder/selectors";
import { Experience } from "@/lib/constants";
import ExperienceSectionTitle from "../SectionTitle";
import {
  addCardToExperienceSection,
  saveExperienceSection,
} from "@/store/slice/builder";
import ExperienceCard from "./ExperienceCard";

const ExtendibleExperienceEditor = forwardRef<WrappedRef, WrappedProps>(
  (props, ref) => {
    const experienceSection = useAppSelector(selectExperienceSection);
    const dispatch = useAppDispatch();

    const cardRef = useRef<Record<string, Experience>>({});
    const titleRef = useRef<Record<string, string>>({});

    const onUpdateTitles = (value: string, field: string) => {
      if (!titleRef.current) return;
      titleRef.current[field] = value;
      console.log(titleRef);
    };

    const onUpdateField = (
      value: string,
      key: string,
      field: keyof Experience
    ) => {
      if (!cardRef.current) return;
      cardRef.current[key] = {
        ...cardRef.current[key],
        [field]: value,
      };
    };

    useImperativeHandle(ref, () => ({
      onSaveHandler: () => {
        const children: Experience[] = Object.keys(cardRef.current).map(
          (key) => ({
            companyTitle: cardRef.current[key].companyTitle ?? "",
            description: cardRef.current[key].description ?? "",
            designation: cardRef.current[key].designation ?? "",
            location: cardRef.current[key].location ?? "",
            timeline: cardRef.current[key].timeline ?? "",
            logo: cardRef.current[key].logo ?? "",
            link: "",
            id: key,
          })
        );
        dispatch(
          saveExperienceSection({
            children,
            title: titleRef.current["title"],
            subtext: titleRef.current["subtext"],
          })
        );
      },
    }));
    console.log(experienceSection);
    return (
      experienceSection && (
        <div className="flex w-full flex-wrap flex-col gap-4">
          <ExperienceSectionTitle
            isInPreviewMode={false}
            isSectionInEditMode={props.isSectionInEditMode}
            onUpdateTitles={onUpdateTitles}
            defaultTitle={experienceSection.title ?? ""}
            subtext={experienceSection.subtext ?? ""}
            placeholder="Experience"
          />
          <div className="flex flex-row gap-4 flex-wrap w-full">
            {experienceSection.children?.map((experience) => (
              <ExperienceCard
                key={experience.id}
                data={experience}
                id={experience.id}
                isInPreviewMode={false}
                isSectionInEditMode={props.isSectionInEditMode}
                onUpdateField={onUpdateField}
              />
            ))}
            {props.isSectionInEditMode && (
              <button
                onClick={() => dispatch(addCardToExperienceSection())}
                className="w-full bg-backgroundHighlight border border-border-1 rounded-lg flex justify-center items-center p-4"
              >
                + Add next
              </button>
            )}
          </div>
        </div>
      )
    );
  }
);

const ExperienceWrapper = withSectionHOC(ExtendibleExperienceEditor);

export default ExperienceWrapper;

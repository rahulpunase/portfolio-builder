import { selectExperienceSection } from "@/store/slice/builder/selectors";
import ExperienceWrapper from "./ExperienceWrapper";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import { useAppSelector } from "@/store";
import ExperienceSectionTitle from "../SectionTitle";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  const isInPreviewMode = useIsInPreviewMode();
  const experienceSection = useAppSelector(selectExperienceSection);

  return isInPreviewMode ? (
    <div className="flex w-full flex-wrap flex-col gap-4">
      <ExperienceSectionTitle
        isInPreviewMode={true}
        isSectionInEditMode={false}
        defaultTitle={experienceSection?.title ?? ""}
        subtext={experienceSection?.subtext ?? ""}
        placeholder="Experience"
      />
      <div className="flex flex-row gap-4 w-full flex-wrap">
        {experienceSection?.children?.map((experience) => (
          <ExperienceCard
            key={experience.id}
            data={experience}
            id={experience.id}
            isInPreviewMode={true}
            isSectionInEditMode={false}
          />
        ))}
      </div>
    </div>
  ) : (
    <ExperienceWrapper type="EXPERIENCE" />
  );
};

export default Experience;

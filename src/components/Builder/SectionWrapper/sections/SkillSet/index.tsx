import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import SkillCardWrapper from "./SkillCardWrapper";
import { useAppSelector } from "@/store";
import { selectSkillsSetSection } from "@/store/slice/builder/selectors";
import SkillCard from "./SkillCard";

const SkillSet = () => {
  const isInPreviewMode = useIsInPreviewMode();
  const skillSetSection = useAppSelector(selectSkillsSetSection);
  return isInPreviewMode ? (
    <div className="flex w-full flex-wrap flex-row gap-4">
      {skillSetSection?.children?.map((item) => (
        <SkillCard
          isInPreviewMode={isInPreviewMode}
          data={item}
          key={item.id}
          isSectionInEditMode={false}
        />
      ))}
    </div>
  ) : (
    <SkillCardWrapper type="SKILLS" />
  );
};

export default SkillSet;

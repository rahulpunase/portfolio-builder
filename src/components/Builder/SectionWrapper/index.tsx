import { MetaSectionType } from "@/lib/constants";
import { useAppSelector } from "@/store";
import { selectSectionList } from "@/store/slice/builder/selectors";
import AboutYou from "./sections/AboutYou";
import AddNewSection from "../AddNewSection";
import SkillSet from "./sections/SkillSet";
import Projects from "./sections/Projects";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import Experience from "./sections/Experience";
import CTA from "./sections/CTA";
import { cn } from "@/lib/ui/utils";

const SectionSelector = ({ type }: { type: MetaSectionType }) => {
  switch (type) {
    case "ABOUT":
      return <AboutYou />;
    case "SKILLS":
      return <SkillSet />;
    case "PROJECTS":
      return <Projects />;
    case "EXPERIENCE":
      return <Experience />;
    case "CTA":
      return <CTA />;

    default:
      return null;
  }
};

const SectionWrapper = () => {
  const sections = useAppSelector(selectSectionList);
  const isInPreviewMode = useIsInPreviewMode();

  return (
    <div>
      <div className="sm:ml-[375px] sm:mt-[120px]">
        <div
          className={cn("flex flex-col gap-y-20", isInPreviewMode && "mb-20")}
        >
          {sections.map((sectionItem) => (
            <SectionSelector key={sectionItem.type} type={sectionItem.type} />
          ))}
        </div>
        {sections.length && !isInPreviewMode ? <AddNewSection /> : null}
      </div>
    </div>
  );
};

export default SectionWrapper;

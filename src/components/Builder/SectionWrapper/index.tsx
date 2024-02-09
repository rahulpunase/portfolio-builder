import { MetaSectionType } from "@/lib/constants";
import { useAppSelector } from "@/store";
import { selectSectionList } from "@/store/slice/builder/selectors";
import AboutYou from "./sections/AboutYou";
import AddNewSection from "../AddNewSection";
import SkillSet from "./sections/SkillSet";
import Projects from "./sections/Projects";

const SectionSelector = ({ type }: { type: MetaSectionType }) => {
  if (type === "ABOUT") {
    return <AboutYou />;
  }
  if (type === "SKILLS") {
    return <SkillSet />;
  }
  if (type === "PROJECTS") {
    return <Projects />;
  }
  return null;
};

const SectionWrapper = () => {
  const sections = useAppSelector(selectSectionList);
  return (
    <div>
      <div className="ml-[375px] mt-[120px]">
        {sections.map((sectionItem) => (
          <SectionSelector key={sectionItem.type} type={sectionItem.type} />
        ))}
        {sections.length ? <AddNewSection /> : null}
      </div>
    </div>
  );
};

export default SectionWrapper;

import withSectionHOC from "../withSectionHOC";
import AddNewCard from "./AddNewCard";
import SkillCard from "./SkillCard";

const SkillSet = withSectionHOC(() => {
  return (
    <div className="flex w-full flex-wrap flex-row gap-4">
      <SkillCard />
      <AddNewCard />
    </div>
  );
});

export default SkillSet;

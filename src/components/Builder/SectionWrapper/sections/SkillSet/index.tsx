import withSectionHOC from "../withSectionHOC";
import AddNewCard from "./AddNewCard";
import SkillCard from "./SkillCard";

const SkillSet = withSectionHOC(({ isSectionInEditMode }) => {
  return (
    <div className="flex w-full flex-wrap flex-row gap-4">
      <SkillCard />
      {isSectionInEditMode && <AddNewCard />}
    </div>
  );
});

export default SkillSet;

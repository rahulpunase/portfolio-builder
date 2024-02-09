import Input from "@/lib/ui/components/input";
import withSectionHOC from "../withSectionHOC";
import ProjectCard from "./ProjectCard";

const Projects = withSectionHOC(() => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col mb-6">
        <Input value="Projects" className="text-[30px] mb-1" />
        <Input placeholder="Add subtext here" className="text-[14px]" />
      </div>
      <div className="flex flex-wrap gap-4 ">
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
});

export default Projects;

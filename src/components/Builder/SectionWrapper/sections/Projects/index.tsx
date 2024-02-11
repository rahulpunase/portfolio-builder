import ProjectCard from "./ProjectCard";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import { useAppSelector } from "@/store";
import { selectProjectsSection } from "@/store/slice/builder/selectors";
import ProjectsWrapper from "./ProjectsWrapper";
import ProjectTitle from "../SectionTitle";

const Projects = () => {
  const isInPreviewMode = useIsInPreviewMode();
  const projectSection = useAppSelector(selectProjectsSection);
  return isInPreviewMode ? (
    <div className="flex w-full flex-wrap flex-col gap-4">
      <ProjectTitle
        isInPreviewMode={isInPreviewMode}
        defaultTitle={projectSection?.title ?? ""}
        subtext={projectSection?.subtext ?? ""}
        isSectionInEditMode={false}
      />
      <div className="flex flex-row gap-4 flex-wrap w-full justify-between">
        {projectSection?.children?.map((item) => (
          <ProjectCard
            data={item}
            key={item.id}
            isInPreviewMode={isInPreviewMode}
            isSectionInEditMode={false}
          />
        ))}
      </div>
    </div>
  ) : (
    <ProjectsWrapper type="PROJECTS" />
  );
};

export default Projects;

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import withSectionHOC, { WrappedProps, WrappedRef } from "../withSectionHOC";
import AddNewCard from "./AddNewCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectProjectsSection } from "@/store/slice/builder/selectors";
import { Projects } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import ProjectTitle from "../SectionTitle";
import { saveProjectSection } from "@/store/slice/builder";

const ExtendibleProjectsEditor = forwardRef<WrappedRef, WrappedProps>(
  (props, ref) => {
    const projectsSection = useAppSelector(selectProjectsSection);
    const dispatch = useAppDispatch();

    const cardRef = useRef<Record<string, Projects>>({});
    const titleRef = useRef<Record<string, string>>({});

    const onUpdateTitles = (value: string, field: string) => {
      if (!titleRef.current) return;
      titleRef.current[field] = value;
    };

    const onUpdateField = (
      value: string,
      key: string,
      field: keyof Projects
    ) => {
      if (!cardRef.current) return;
      cardRef.current[key] = {
        ...cardRef.current[key],
        [field]: value,
      };
    };

    useEffect(() => {
      projectsSection?.children?.forEach((item) => {
        cardRef.current[item.id] = {
          description: item.description,
          id: item.id,
          link: item.link,
          logo: item.logo,
          title: item.title,
        };
      });
    }, [projectsSection]);

    useImperativeHandle(ref, () => ({
      onSaveHandler: () => {
        const children: Projects[] = Object.keys(cardRef.current).map(
          (key) => ({
            title: cardRef.current[key].title,
            description: cardRef.current[key].description,
            logo: cardRef.current[key].logo,
            link: "",
            id: key,
          })
        );
        dispatch(
          saveProjectSection({
            subtext: titleRef.current["subtext"],
            title: titleRef.current["title"],
            children,
          })
        );
      },
    }));

    return (
      projectsSection && (
        <div className="flex w-full flex-wrap flex-col gap-4">
          <ProjectTitle
            isInPreviewMode={false}
            isSectionInEditMode={props.isSectionInEditMode}
            onUpdateTitles={onUpdateTitles}
            defaultTitle={projectsSection.title ?? ""}
            subtext={projectsSection.subtext ?? ""}
            placeholder="Projects"
          />
          <div className="flex flex-row gap-4 flex-wrap w-full justify-between">
            {projectsSection.children?.map((item) => (
              <ProjectCard
                isSectionInEditMode={props.isSectionInEditMode}
                key={item.id}
                id={item.id}
                onUpdateField={onUpdateField}
              />
            ))}
            {props.isSectionInEditMode && <AddNewCard />}
          </div>
        </div>
      )
    );
  }
);

const ProjectsWrapper = withSectionHOC(ExtendibleProjectsEditor);

export default ProjectsWrapper;

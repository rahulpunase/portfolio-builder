import { v4 as uuid } from "uuid";

export const APP_PATHS = {
  Builder: "/builder",
  Preview: "/preview",
};

export type MetaSectionType =
  | "ABOUT"
  | "SKILLS"
  | "PROJECTS"
  | "EXPERIENCE"
  | "CTA";

export type Skills = {
  title: string;
  description: string;
  content: string;
  id: string;
};

export type AboutSection = {
  content: string;
};

export type SkillsetsSection = {
  children?: Array<Skills>;
};

export type Projects = {
  title: string;
  description: string;
  link: string;
  id: string;
  logo: string;
};

export type ProjectSection = {
  title?: string;
  subtext?: string;
  children?: Array<Projects>;
};

export type Experience = {
  companyTitle: string;
  designation: string;
  location: string;
  timeline: string;
  description: string;
  logo: string;
  id: string;
};

export type ExperienceSection = {
  title?: string;
  subtext?: string;
  children?: Array<Experience>;
};

export type CTASection = {
  title: string;
  subtext: string;
};

export type MetaConfigSections<K extends MetaSectionType> = K extends "ABOUT"
  ? AboutSection
  : K extends "SKILLS"
  ? SkillsetsSection
  : K extends "PROJECTS"
  ? ProjectSection
  : K extends "EXPERIENCE"
  ? ExperienceSection
  : K extends "CTA"
  ? CTASection
  : never;

export type DefaultSectionConfig<K extends MetaSectionType> = {
  order: number;
  type: MetaSectionType;
} & MetaConfigSections<K>;

export type CommonSections =
  | DefaultSectionConfig<"ABOUT">
  | DefaultSectionConfig<"SKILLS">
  | DefaultSectionConfig<"PROJECTS">
  | DefaultSectionConfig<"EXPERIENCE">
  | DefaultSectionConfig<"CTA">;

export type MetaSections = {
  [key in MetaSectionType]: MetaConfigSections<key>;
};

export type SectionType =
  | "About you"
  | "Skillsets"
  | "Projects"
  | "Experience"
  | "CTA";

export type SectionItem = {
  name: SectionType;
  type: MetaSectionType;
};

export const Sections: Array<SectionItem> = [
  {
    name: "About you",
    type: "ABOUT",
  },
  {
    name: "Skillsets",
    type: "SKILLS",
  },
  {
    name: "Projects",
    type: "PROJECTS",
  },
  {
    name: "Experience",
    type: "EXPERIENCE",
  },
  {
    name: "CTA",
    type: "CTA",
  },
];

export const getDefaultDataForSkills = (
  order: number
): DefaultSectionConfig<"SKILLS"> => {
  return {
    order,
    type: "SKILLS",
    children: [
      {
        title: "",
        description: "",
        content: "",
        id: uuid(),
      },
    ],
  };
};

export const getDefaultDataForProjects = (
  order: number
): DefaultSectionConfig<"PROJECTS"> => {
  return {
    order,
    type: "PROJECTS",
    subtext: "",
    title: "",
    children: [
      {
        description: "",
        link: "",
        title: "",
        id: uuid(),
        logo: "",
      },
    ],
  };
};

export const getDefaultDataForExperience = (
  order: number
): DefaultSectionConfig<"EXPERIENCE"> => {
  return {
    order,
    type: "EXPERIENCE",
    subtext: "",
    title: "",
    children: [
      {
        description: "",
        id: uuid(),
        logo: "",
        companyTitle: "",
        designation: "",
        location: "",
        timeline: "",
      },
    ],
  };
};

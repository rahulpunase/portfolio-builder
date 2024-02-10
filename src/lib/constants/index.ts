export type MetaSectionType =
  | "ABOUT"
  | "SKILLS"
  | "PROJECTS"
  | "EXPERIENCE"
  | "CTA";

export type Skills = {
  title: string;
  subtitle: string;
  content: string;
};

export type AboutSection = {
  content: string;
};

export type SkillsetsSection = {
  children?: Array<Skills>;
};

export type Projects = {
  title: string;
  subtitle: string;
  link: string;
};

export type ProjectSection = {
  title?: string;
  subtext?: string;
  children?: Array<Projects>;
};

export type ExperienceSection = {
  title?: string;
  children?: Array<Projects>;
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
  ? ExperienceSection
  : never;

export type DefaultSectionConfig<K extends MetaSectionType> = {
  displayName?: string;
  order: number;
  type: MetaSectionType;
} & MetaConfigSections<K>;

export type CommonSections =
  | DefaultSectionConfig<"ABOUT">
  | DefaultSectionConfig<"SKILLS">
  | DefaultSectionConfig<"PROJECTS">
  | DefaultSectionConfig<"EXPERIENCE">;

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

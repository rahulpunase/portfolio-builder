import {
  CommonSections,
  DefaultSectionConfig,
  Experience,
  MetaSectionType,
  Projects,
  Skills,
  getDefaultDataForExperience,
  getDefaultDataForProjects,
  getDefaultDataForSkills,
} from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { v4 as uuid } from "uuid";

type InitialState = {
  title: string;
  subtitle: string;
  sections: Array<CommonSections>;
  name: string;
  email: string;
  profilePicture: string;
  isPublished: boolean;
};

export const initialState: InitialState = {
  title: "",
  subtitle: "",
  profilePicture: "",
  name: "",
  email: "",
  sections: [],
  isPublished: false,
};

const BuilderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateSubtitle: (state, action: PayloadAction<string>) => {
      state.subtitle = action.payload;
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    saveAboutSection: (state, action: PayloadAction<{ html: string }>) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "ABOUT"
      ) as DefaultSectionConfig<"ABOUT"> | undefined;
      if (!sectionToUpdate) return;
      sectionToUpdate.content = action.payload.html;
    },

    addCardToSkillSection: (state) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "SKILLS"
      ) as DefaultSectionConfig<"SKILLS"> | undefined;
      if (!sectionToUpdate) return;
      sectionToUpdate.children?.push({
        title: "",
        description: "",
        content: "",
        id: uuid(),
      });
    },

    addCardToProjectsSection: (state) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "PROJECTS"
      ) as DefaultSectionConfig<"PROJECTS"> | undefined;
      if (!sectionToUpdate) return;
      sectionToUpdate.children?.push({
        title: "",
        description: "",
        link: "",
        logo: "",
        id: uuid(),
      });
    },

    addCardToExperienceSection: (state) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "EXPERIENCE"
      ) as DefaultSectionConfig<"EXPERIENCE"> | undefined;
      if (!sectionToUpdate) return;
      sectionToUpdate.children?.push({
        description: "",
        id: uuid(),
        logo: "",
        companyTitle: "",
        designation: "",
        location: "",
        timeline: "",
      });
    },

    saveSkillSection: (
      state,
      action: PayloadAction<{
        children: Skills[];
      }>
    ) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "SKILLS"
      ) as DefaultSectionConfig<"SKILLS"> | undefined;
      if (!sectionToUpdate) return;
      sectionToUpdate.children = action.payload.children;
    },

    saveProjectSection: (
      state,
      action: PayloadAction<{
        children: Projects[];
        title: string;
        subtext: string;
      }>
    ) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "PROJECTS"
      ) as DefaultSectionConfig<"PROJECTS"> | undefined;
      if (!sectionToUpdate) return;
      sectionToUpdate.title = action.payload.title;
      sectionToUpdate.subtext = action.payload.subtext;
      sectionToUpdate.children = action.payload.children;
    },

    saveExperienceSection: (
      state,
      action: PayloadAction<{
        children: Experience[];
        title: string;
        subtext: string;
      }>
    ) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "EXPERIENCE"
      ) as DefaultSectionConfig<"EXPERIENCE"> | undefined;
      if (!sectionToUpdate) return;
      console.log({ action });
      sectionToUpdate.title = action.payload.title;
      sectionToUpdate.subtext = action.payload.subtext;
      sectionToUpdate.children = action.payload.children;
    },

    saveCTASection: (
      state,
      action: PayloadAction<{ title: string; subtext: string }>
    ) => {
      const sectionToUpdate = state.sections.find(
        (section) => section.type === "CTA"
      ) as DefaultSectionConfig<"CTA"> | undefined;
      if (!sectionToUpdate) return;
      sectionToUpdate.title = action.payload.title;
      sectionToUpdate.subtext = action.payload.subtext;
    },

    addSection: (
      state,
      action: PayloadAction<{ sectionType: MetaSectionType }>
    ) => {
      const item = state.sections.find(
        (section) => section.type === action.payload.sectionType
      );
      if (item) return;
      const order = state.sections.length;
      if (action.payload.sectionType === "SKILLS") {
        state.sections.push(getDefaultDataForSkills(order));
        return;
      }
      if (action.payload.sectionType === "PROJECTS") {
        state.sections.push(getDefaultDataForProjects(order));
        return;
      }
      if (action.payload.sectionType === "EXPERIENCE") {
        state.sections.push(getDefaultDataForExperience(order));
        return;
      }
      state.sections.push({
        type: action.payload.sectionType,
        order: order,
      });
    },

    deleteSection: (
      state,
      action: PayloadAction<{
        sectionType: MetaSectionType;
      }>
    ) => {
      const index = state.sections.findIndex(
        (item) => item.type === action.payload.sectionType
      );
      if (index > -1) {
        state.sections.splice(index, 1);
      }
    },

    sort: (
      state,
      action: PayloadAction<{
        dir: "up" | "down";
        index: number;
      }>
    ) => {
      const sections = [...state.sections];
      const { dir, index } = action.payload;

      const nextIndex = dir === "down" ? index + 1 : index - 1;

      const temp = sections[index];
      temp.order = nextIndex;
      sections[index] = sections[nextIndex];
      sections[index].order = index;
      sections[nextIndex] = temp;
      state.sections = sections;
    },
  },
});

export default BuilderSlice.reducer;
export const {
  addSection,
  updateTitle,
  updateSubtitle,
  updateProfilePicture,
  updateName,
  updateEmail,
  saveAboutSection,
  addCardToSkillSection,
  deleteSection,
  saveSkillSection,
  addCardToProjectsSection,
  saveProjectSection,
  addCardToExperienceSection,
  saveExperienceSection,
  saveCTASection,
  sort,
} = BuilderSlice.actions;

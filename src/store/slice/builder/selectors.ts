import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from ".";
import { DefaultSectionConfig } from "@/lib/constants";

const selectBuilder = (state: RootState) => state.builder ?? initialState;

export const selectSectionList = createSelector(
  selectBuilder,
  (state) => state.sections
);

export const selectTitles = createSelector(selectBuilder, (state) => ({
  title: state.title,
  subtitle: state.subtitle,
}));

export const selectProfilePicture = createSelector(
  selectBuilder,
  (state) => state.profilePicture
);

export const selectPersonalInfo = createSelector(selectBuilder, (state) => ({
  name: state.name,
  email: state.email,
}));

export const selectAboutYouSetSection = createSelector(
  selectSectionList,
  (list) =>
    list.find((item) => item.type === "ABOUT") as
      | DefaultSectionConfig<"ABOUT">
      | undefined
);

export const selectSkillsSetSection = createSelector(
  selectSectionList,
  (list) =>
    list.find((item) => item.type === "SKILLS") as
      | DefaultSectionConfig<"SKILLS">
      | undefined
);

export const selectProjectsSection = createSelector(
  selectSectionList,
  (list) =>
    list.find((item) => item.type === "PROJECTS") as
      | DefaultSectionConfig<"PROJECTS">
      | undefined
);

export const selectExperienceSection = createSelector(
  selectSectionList,
  (list) =>
    list.find((item) => item.type === "EXPERIENCE") as
      | DefaultSectionConfig<"EXPERIENCE">
      | undefined
);

export const selectCTASection = createSelector(
  selectSectionList,
  (list) =>
    list.find((item) => item.type === "CTA") as
      | DefaultSectionConfig<"CTA">
      | undefined
);

import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from ".";

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

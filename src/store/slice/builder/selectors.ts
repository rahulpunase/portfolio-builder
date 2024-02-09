import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from ".";

const selectBuilder = (state: RootState) => state.builder ?? initialState;

export const selectSectionList = createSelector(
  selectBuilder,
  (state) => state.sections
);

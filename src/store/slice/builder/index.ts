import { CommonSections, MetaSectionType } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

type InitialState = {
  sections: Array<CommonSections>;
  isPublished: boolean;
};

export const initialState: InitialState = {
  sections: [],
  isPublished: false,
};

const BuilderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addSection: (
      state,
      action: PayloadAction<{ sectionType: MetaSectionType }>
    ) => {
      state.sections.push({
        type: action.payload.sectionType,
        order: 1,
      });
    },
  },
});

export default BuilderSlice.reducer;
export const { addSection } = BuilderSlice.actions;

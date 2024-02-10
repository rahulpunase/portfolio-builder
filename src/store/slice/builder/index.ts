import { CommonSections, MetaSectionType } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

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
export const {
  addSection,
  updateTitle,
  updateSubtitle,
  updateProfilePicture,
  updateName,
  updateEmail,
} = BuilderSlice.actions;

import {
  CommonSections,
  DefaultSectionConfig,
  MetaSectionType,
  Skills,
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
    updateAboutSection: (state, action: PayloadAction<{ html: string }>) => {
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

    addSection: (
      state,
      action: PayloadAction<{ sectionType: MetaSectionType }>
    ) => {
      if (action.payload.sectionType === "SKILLS") {
        const itemToAdd: DefaultSectionConfig<"SKILLS"> = {
          children: [
            {
              title: "",
              description: "",
              content: "",
              id: uuid(),
            },
          ],
          type: "SKILLS",
          order: 1,
        };
        state.sections.push(itemToAdd as DefaultSectionConfig<"SKILLS">);
        return;
      }
      state.sections.push({
        type: action.payload.sectionType,
        order: 1,
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
  updateAboutSection,
  addCardToSkillSection,
  deleteSection,
  saveSkillSection,
} = BuilderSlice.actions;

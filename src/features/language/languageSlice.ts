import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import type { LanguageCode } from "../../i18n/language";

interface LanguageState {
  language: LanguageCode;
}

const savedLanguage = localStorage.getItem("i18nextLng");

const initialState: LanguageState = {
  language: savedLanguage === "no" ? "no" : "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: { payload: LanguageCode }) => {
      state.language = action.payload;

      i18n.changeLanguage(action.payload);
      localStorage.setItem("i18nextLng", action.payload);
    },

    initializeLanguage: (state) => {
      i18n.changeLanguage(state.language);
      localStorage.setItem("i18nextLng", state.language);
    },
  },
});

export const { changeLanguage, initializeLanguage } = languageSlice.actions;

export default languageSlice.reducer;

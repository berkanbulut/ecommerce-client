import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

const savedTheme = localStorage.getItem("theme");

const initialState: ThemeState = {
  theme: savedTheme === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";

      localStorage.setItem("theme", state.theme);
      document.documentElement.setAttribute("data-theme", state.theme);
    },

    initializeTheme: (state) => {
      document.documentElement.setAttribute("data-theme", state.theme);
    },
  },
});

export const { toggleTheme, initializeTheme } = themeSlice.actions;

export default themeSlice.reducer;

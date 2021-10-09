import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  themeMode: "dark",
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
  },
});

export const { setError, toggleThemeMode } = rootSlice.actions;
export default rootSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setError } = rootSlice.actions;
export default rootSlice.reducer;

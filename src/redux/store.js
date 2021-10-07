import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./slices/rootSlice";
import countriesSlice from "./slices/countriesSlice";

export const store = configureStore({
  reducer: {
    root: rootSlice,
    countries: countriesSlice,
  },
});

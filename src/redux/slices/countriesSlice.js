import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperatureMode: "Metric",
  selectedCountry: {},
  currentWeather: {},
  forecast: [],
  favorites: [],
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setForecast: (state, action) => {
      state.forecast = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push({
        country: action.payload,
        currentWeather: state.currentWeather,
      });
    },
    removeFromFavorites: (state, action) => {
      const keyToRemove = action.payload;
      const indexToRemove = state.favorites.find(
        (favorite) => favorite.Key === keyToRemove
      );
      state.favorites.splice(indexToRemove, 1);
    },
    toggleTemperatureMode: (state) => {
      state.temperatureMode =
        state.temperatureMode === "Metric" ? "Imperial" : "Metric";
    },
  },
});

export const {
  setSelectedCountry,
  setCurrentWeather,
  setForecast,
  addToFavorites,
  removeFromFavorites,
  toggleTemperatureMode,
} = countriesSlice.actions;
export default countriesSlice.reducer;

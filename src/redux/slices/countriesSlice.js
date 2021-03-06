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
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFromFavorites: (state, action) => {
      const keyToRemove = action.payload;
      const indexToRemove = state.favorites.find(
        (favorite) => favorite.Key === keyToRemove
      );
      const favorties = state.favorites.splice(indexToRemove, 1);
      localStorage.setItem("favorites", JSON.stringify(favorties));
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

import { useEffect } from "react";
import SearchCity from "./search-city/SearchCity";
import CurrentWeather from "./current-weather/CurrentWeather";
import Forecast from "./forecast/Forecast";
import AddToFavorite from "./add-to-favorite/AddToFavorite";
import { Grid } from "@mui/material";
import http, { API_KEY } from "../../axios";
import { useDispatch } from "../../redux/hooks";
import { setSelectedCountry } from "../../redux/slices/countriesSlice";
import { setError } from "../../redux/slices/rootSlice";

export const WeatherDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // BONUS Mission: Initiate the app with current location data
    const getInitialCoords = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve);
      });
    };

    const getCurrentLocation = async () => {
      const { coords } = await getInitialCoords();

      try {
        const response = await http.get(
          `/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${coords.latitude},${coords.longitude}`
        );

        dispatch(setSelectedCountry(response.data));
      } catch (e) {
        dispatch(
          setError(
            "Cannot load current location weather. Please try again later."
          )
        );
      }
    };

    getCurrentLocation();
  }, [dispatch]);

  return (
    <div>
      <SearchCity />
      <Grid container justifyContent="space-between" sx={{ mb: "4rem" }}>
        <Grid item xs={12} md={3}>
          <CurrentWeather />
        </Grid>
        <Grid item>
          <AddToFavorite />
        </Grid>
      </Grid>
      <Forecast />
    </div>
  );
};

export default WeatherDetails;

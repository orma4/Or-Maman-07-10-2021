import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchCity from "./search-city/SearchCity";
import CurrentWeather from "./current-weather/CurrentWeather";
import Forecast from "./forecast/Forecast";
import AddToFavorite from "./add-to-favorite/AddToFavorite";
import { Grid } from "@mui/material";
import http, { API_KEY } from "../../axios";
import { useDispatch, useSelector } from "../../redux/hooks";
import { setSelectedCountry } from "../../redux/slices/countriesSlice";
import { setError } from "../../redux/slices/rootSlice";

export const WeatherDetails = () => {
  const dispatch = useDispatch();
  const { selectedCountry } = useSelector((state) => state.countries);
  const history = useHistory();
  const refFromFavorites = history.location.search.includes("from-favorites");

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
        // const response = await http.get("/__mocks__/geolocation.json");

        dispatch(setSelectedCountry(response.data));
      } catch (e) {
        dispatch(
          setError(
            "Cannot load current location weather. Please try again later."
          )
        );
      }
    };

    // Run only at first render (Do not run this call if user coming from favorites route)
    if (!refFromFavorites && selectedCountry.Key === undefined) {
      getCurrentLocation();
    }
  }, [dispatch, refFromFavorites, selectedCountry.Key]);

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

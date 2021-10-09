import { useState, useEffect } from "react";
import http, { API_KEY } from "../../../axios";
import { Paper, Grid, useMediaQuery, Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { setError } from "../../../redux/slices/rootSlice";
import { setCurrentWeather } from "../../../redux/slices/countriesSlice";
import { CardBg } from "../../../components";

export const CurrentWeather = () => {
  const [temperature, setTemperature] = useState("");
  const { selectedCountry, currentWeather, temperatureMode } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        // const response = await http.get("/__mocks__/current-conditions.json");
        const response = await http.get(
          `/currentconditions/v1/${selectedCountry.Key}/?apikey=${API_KEY}`
        );

        dispatch(setCurrentWeather(response.data[0]));
      } catch (error) {
        dispatch(
          setError(`Can't load current weather. Please try again later.`)
        );
      }
    };

    if (selectedCountry.Key) {
      getCurrentWeather();
    }
  }, [selectedCountry, dispatch]);

  useEffect(() => {
    if (currentWeather?.Temperature) {
      setTemperature(currentWeather?.Temperature[temperatureMode].Value);
    }
  }, [currentWeather, temperatureMode]);

  return (
    <div>
      {temperature ? (
        <Paper
          sx={{
            p: "3rem",
            width: isSmallScreen ? "auto" : "23rem",
            height: isSmallScreen ? "10rem" : "15rem",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%", position: "relative" }}
          >
            <CardBg />
            <strong>Current Weather</strong>
            <p>{selectedCountry?.LocalizedName}</p>
            <p>
              {temperature} {temperatureMode === "Metric" ? "C" : "F"}
            </p>
          </Grid>
        </Paper>
      ) : (
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            width: isSmallScreen ? "auto" : "23rem",
            height: isSmallScreen ? "10rem" : "15rem",
          }}
        />
      )}
    </div>
  );
};

export default CurrentWeather;

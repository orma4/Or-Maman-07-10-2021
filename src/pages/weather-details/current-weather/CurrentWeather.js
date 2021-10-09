import { useState, useEffect } from "react";
import http from "../../../axios";
import { Paper, Grid } from "@mui/material";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { setError } from "../../../redux/slices/rootSlice";
import { setCurrentWeather } from "../../../redux/slices/countriesSlice";

export const CurrentWeather = () => {
  const [temperature, setTemperature] = useState("");
  const { selectedCountry, currentWeather, temperatureMode } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();
  const API_KEY = "oFMAaYMW5Wt6vMwZ2GsEbFldd4pExTsK"; // TODO: Extract to env file

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
      {temperature && (
        <Paper sx={{ p: "30px", width: "230px", height: "150px" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <p>Current Weather</p>
            <p>{selectedCountry?.LocalizedName}</p>
            <p>
              {temperature} {temperatureMode === "Metric" ? "C" : "F"}
            </p>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default CurrentWeather;

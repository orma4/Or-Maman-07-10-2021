import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { setForecast } from "../../../redux/slices/countriesSlice";
import { setError } from "../../../redux/slices/rootSlice";
import { Paper } from "@mui/material";
import http from "../../../axios";
import moment from "moment";

export const Forecast = () => {
  const { selectedCountry, forecast, temperatureMode } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();
  const API_KEY = "oFMAaYMW5Wt6vMwZ2GsEbFldd4pExTsK"; // TODO: Extract to env file

  useEffect(() => {
    const getFiveDaysForecast = async () => {
      try {
        let endpoint;

        if (temperatureMode === "Metric") {
          endpoint = `/forecasts/v1/daily/5day/${selectedCountry.Key}?apikey=${API_KEY}&metric=true`;
        } else {
          endpoint = `/forecasts/v1/daily/5day/${selectedCountry.Key}?apikey=${API_KEY}`;
        }

        // const response = await http.get("/__mocks__/five-days-forecast.json");
        const response = await http.get(endpoint);
        dispatch(setForecast(response.data.DailyForecasts));
      } catch (error) {
        dispatch(setError(`Can't load forecast. Please try again later.`));
      }
    };

    if (selectedCountry.Key) {
      getFiveDaysForecast();
    }
  }, [selectedCountry, dispatch, temperatureMode]);

  return (
    <div>
      {forecast.map(({ Date, Temperature }, index) => {
        return (
          <Paper key={index}>
            <p>{moment(Date).format("L")}</p>
            <p>
              {Temperature?.Maximum?.Value}
              {temperatureMode === "Metric" ? "C" : "F"}
            </p>
          </Paper>
        );
      })}
    </div>
  );
};

export default Forecast;

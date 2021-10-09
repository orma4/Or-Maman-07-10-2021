import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { setForecast } from "../../../redux/slices/countriesSlice";
import { setError } from "../../../redux/slices/rootSlice";
import { Paper, Grid, Skeleton } from "@mui/material";
import http, { API_KEY } from "../../../axios";
import moment from "moment";
import { CardBg } from "../../../components";

export const Forecast = () => {
  const { selectedCountry, forecast, temperatureMode } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();

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
    <Grid container justifyContent="space-between" spacing={2}>
      {forecast.length > 0
        ? forecast.map(({ Date, Temperature }, index) => {
            return (
              <Grid item xs={12} md={2} key={index}>
                <Paper
                  sx={{
                    height: "15rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <CardBg />
                  <strong>{moment(Date).format("dddd")}</strong>
                  <p>
                    {Temperature?.Maximum?.Value}
                    {temperatureMode === "Metric" ? "C" : "F"}
                  </p>
                </Paper>
              </Grid>
            );
          })
        : new Array(5)
            .fill(1)
            .map((slot, index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rectangular"
                sx={{ width: "18rem", height: "15rem" }}
              />
            ))}
    </Grid>
  );
};

export default Forecast;

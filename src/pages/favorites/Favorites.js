import { useDispatch, useSelector } from "../../redux/hooks";
import { setSelectedCountry } from "../../redux/slices/countriesSlice";
import { useHistory } from "react-router-dom";
import { Typography, Paper } from "@mui/material";
import { useStyles } from "../weather-details/current-weather/CurrentWeather";

export const Favorites = () => {
  const localFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const { temperatureMode } = useSelector((state) => state.countries);

  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const { themeMode } = useSelector((state) => state.root);

  const handleFavoriteClick = (LocalizedName, Key) => {
    dispatch(setSelectedCountry({ LocalizedName, Key }));
    history.push("/?from-favorites");
  };

  return (
    <div>
      {localFavorites.length > 0 ? (
        localFavorites?.map(({ country, currentWeather }) => {
          const temperature =
            currentWeather?.Temperature[temperatureMode].Value;

          return (
            <Paper
              className={themeMode === "dark" ? classes.paperRoot : ""}
              key={country.Key}
              onClick={() =>
                handleFavoriteClick(country.LocalizedName, country.Key)
              }
              sx={{ padding: "2rem", mb: "2rem", cursor: "pointer" }}
            >
              <strong
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                {country.LocalizedName}
              </strong>
              <p>
                {temperature} {temperatureMode === "Metric" ? "C°" : "F°"}
              </p>
              <p>{currentWeather.WeatherText}</p>
            </Paper>
          );
        })
      ) : (
        <Typography component="h2" variant="h2">
          There are no favorites selected yet.
        </Typography>
      )}
    </div>
  );
};

export default Favorites;

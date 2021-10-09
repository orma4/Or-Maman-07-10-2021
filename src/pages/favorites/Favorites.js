import { useDispatch, useSelector } from "../../redux/hooks";
import { setSelectedCountry } from "../../redux/slices/countriesSlice";
import { useHistory } from "react-router-dom";

export const Favorites = () => {
  const { favorites, temperatureMode } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFavoriteClick = (LocalizedName, Key) => {
    dispatch(setSelectedCountry({ LocalizedName, Key }));
    history.push("/");
  };

  return (
    <div>
      {favorites?.map(({ country, currentWeather }) => {
        const temperature = currentWeather?.Temperature[temperatureMode].Value;

        return (
          <div
            key={country.Key}
            onClick={() =>
              handleFavoriteClick(country.LocalizedName, country.Key)
            }
          >
            <p>{country.LocalizedName}</p>
            <p>
              {temperature} {temperatureMode === "Metric" ? "C" : "F"}
            </p>
            <p>{currentWeather.WeatherText}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;

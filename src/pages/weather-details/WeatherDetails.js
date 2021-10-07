import SearchCity from "./search-city/SearchCity";
import CurrentWeather from "./current-weather/CurrentWeather";
import Forecast from "./forecast/Forecast";
import AddToFavorite from "./add-to-favorite/AddToFavorite";

export const WeatherDetails = () => {
  return (
    <div>
      <SearchCity />
      <CurrentWeather />
      <AddToFavorite />
      <Forecast />
    </div>
  );
};

export default WeatherDetails;

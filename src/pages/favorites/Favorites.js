import { useDispatch, useSelector } from "../../redux/hooks";

export const Favorites = () => {
  const { favorites } = useSelector((state) => state.countries);
  const dispatch = useDispatch();
  console.log(favorites);

  return (
    <div>
      {favorites?.map(({ country, currentWeather }) => {
        return (
          <div key={country.Key}>
            <p>{country.LocalizedName}</p>
            <p>{currentWeather.Temperature.Metric.Value} C</p>
            <p>{currentWeather.WeatherText}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;

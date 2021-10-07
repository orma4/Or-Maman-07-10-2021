import { useEffect } from "react";
import http from "../../../axios";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { setError } from "../../../redux/slices/rootSlice";
import { setCurrentWeather } from "../../../redux/slices/countriesSlice";

export const CurrentWeather = () => {
  const { selectedCountry, currentWeather } = useSelector(
    (state) => state.countries
  );
  const dispatch = useDispatch();
  const currentCelciusTemperature = currentWeather?.Temperature?.Metric?.Value;

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const response = await http.get("/__mocks__/current-conditions.json");
        dispatch(setCurrentWeather(response.data[0]));
      } catch (error) {
        debugger;

        dispatch(
          setError(`Can't load current weather. Please try again later.`)
        );
      }
    };

    if (selectedCountry?.LocalizedName) {
      getCurrentWeather();
    }
  }, [selectedCountry, dispatch]);

  return (
    <div>
      {currentCelciusTemperature && (
        <>
          <p>Current Weather</p>
          <p>{selectedCountry?.LocalizedName}</p>
          <p>{currentCelciusTemperature} C</p>
        </>
      )}
    </div>
  );
};

export default CurrentWeather;

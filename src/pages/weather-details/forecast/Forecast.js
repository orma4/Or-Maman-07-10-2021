import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { setForecast } from "../../../redux/slices/countriesSlice";
import { setError } from "../../../redux/slices/rootSlice";
import http from "../../../axios";
import moment from "moment";

export const Forecast = () => {
  const { selectedCountry, forecast } = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFiveDaysForecast = async () => {
      try {
        const response = await http.get("/__mocks__/five-days-forecast.json");
        dispatch(setForecast(response.data.DailyForecasts));
      } catch (error) {
        dispatch(setError(`Can't load forecast. Please try again later.`));
      }
    };

    if (selectedCountry?.LocalizedName) {
      getFiveDaysForecast();
    }
  }, [selectedCountry, dispatch]);

  return (
    <div>
      {forecast.map(({ Date, Temperature }, index) => {
        return (
          <div key={index}>
            <p>{moment(Date).format("L")}</p>
            <p>{Temperature?.Maximum?.Value} F</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;

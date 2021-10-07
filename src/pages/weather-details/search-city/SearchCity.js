import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import http from "../../../axios";
import { useSelector, useDispatch } from "../../../redux/hooks";
import { setError } from "../../../redux/slices/rootSlice";
import { setSelectedCountry } from "../../../redux/slices/countriesSlice";

export const SearchCity = () => {
  const { selectedCountry } = useSelector((state) => state.countries);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await http.get("/__mocks__/autcomplete-search.json");

        setCitiesOptions(response.data);
      } catch (e) {
        dispatch(setError("Something went wrong. Please try again later."));
      }
    };

    if (searchTerm) {
      fetchCities();
    }
  }, [searchTerm, dispatch]);

  return (
    <div>
      <Autocomplete
        disablePortal
        options={citiesOptions}
        sx={{ width: 300 }}
        popupIcon={null}
        getOptionLabel={(option) => option.LocalizedName}
        renderOption={(props, option) => {
          return (
            <span key={option.LocalizedName} {...props}>
              {option.LocalizedName}
            </span>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search city..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            dispatch(setSelectedCountry(newValue));
          }
        }}
      />
    </div>
  );
};

export default SearchCity;

import { useState, useEffect } from "react";
import { Autocomplete, TextField, Grid } from "@mui/material";
import http from "../../../axios";
import { useDispatch } from "../../../redux/hooks";
import { setError } from "../../../redux/slices/rootSlice";
import { setSelectedCountry } from "../../../redux/slices/countriesSlice";

export const SearchCity = () => {
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteError, setAutocompleteError] = useState(false);
  const API_KEY = "oFMAaYMW5Wt6vMwZ2GsEbFldd4pExTsK"; // TODO: Extract to env file
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // const response = await http.get("/__mocks__/autcomplete-search.json");
        const response = await http.get(
          `/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchTerm}`
        );
        setCitiesOptions(response.data);
      } catch (e) {
        dispatch(setError("Something went wrong. Please try again later."));
      }
    };

    if (searchTerm) {
      fetchCities();
    }
  }, [searchTerm, dispatch]);

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    const isEnglishLetters = /^[a-zA-Z\s]*$/.test(value);
    if (isEnglishLetters) {
      setAutocompleteError(false);
      setSearchTerm(e.target.value);
    } else {
      setAutocompleteError(true);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ mb: "40px" }}>
      <Grid item>
        <Autocomplete
          disablePortal
          options={citiesOptions}
          sx={{ width: 300 }}
          popupIcon={null}
          getOptionLabel={(option) => option.LocalizedName}
          renderOption={(props, option) => {
            return (
              <span key={props.id} {...props}>
                {option.LocalizedName}
              </span>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search city..."
              error={autocompleteError}
              helperText={
                autocompleteError && "Only english letters are allowed"
              }
              onChange={handleSearchTermChange}
            />
          )}
          onChange={(event, newValue) => {
            if (newValue) {
              dispatch(setSelectedCountry(newValue));
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SearchCity;

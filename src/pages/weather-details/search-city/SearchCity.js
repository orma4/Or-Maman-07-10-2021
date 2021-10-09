import { useState, useEffect } from "react";
import { Autocomplete, TextField, Grid, useMediaQuery } from "@mui/material";
import http, { API_KEY } from "../../../axios";
import { useDispatch } from "../../../redux/hooks";
import { setError } from "../../../redux/slices/rootSlice";
import { setSelectedCountry } from "../../../redux/slices/countriesSlice";

export const SearchCity = () => {
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [autocompleteError, setAutocompleteError] = useState(false);
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

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
    <Grid
      container
      justifyContent={isSmallScreen ? "flex-start" : "center"}
      sx={{ mb: "4rem" }}
    >
      <Grid item sx={{ width: isSmallScreen ? "100%" : "auto" }}>
        <Autocomplete
          disablePortal
          options={citiesOptions}
          sx={{ width: isSmallScreen ? "auto" : "30rem" }}
          popupIcon={null}
          noOptionsText="Start typing..."
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

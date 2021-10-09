import { useSelector, useDispatch } from "../../../redux/hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/countriesSlice";
import { Paper } from "@mui/material";

export const AddToFavorite = () => {
  const dispatch = useDispatch();
  const { selectedCountry, favorites } = useSelector(
    (state) => state.countries
  );
  const existInFavorites = favorites.find(
    (favorite) => favorite.country.Key === selectedCountry.Key
  );

  return (
    <>
      {selectedCountry?.LocalizedName && (
        <Paper sx={{ p: "30px", width: "230px", height: "150px" }}>
          {existInFavorites ? (
            <button
              onClick={() => dispatch(removeFromFavorites(selectedCountry.Key))}
            >
              Remove from favorites
            </button>
          ) : (
            <button onClick={() => dispatch(addToFavorites(selectedCountry))}>
              Add to favorites
            </button>
          )}
        </Paper>
      )}
    </>
  );
};

export default AddToFavorite;

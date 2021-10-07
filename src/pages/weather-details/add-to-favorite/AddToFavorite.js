import { useSelector, useDispatch } from "../../../redux/hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/countriesSlice";

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
        <div>
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
        </div>
      )}
    </>
  );
};

export default AddToFavorite;

import { useSelector, useDispatch } from "../../../redux/hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/countriesSlice";
import { styled, Button, Skeleton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { mobile } from "../../../utils/styles/screen-sizes";

const StyledContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 100%;

  @media ${mobile} {
    width: auto;
  }
`;

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
      {selectedCountry?.LocalizedName ? (
        <StyledContainer>
          {existInFavorites ? (
            <Button
              onClick={() => dispatch(removeFromFavorites(selectedCountry.Key))}
            >
              <FavoriteIcon />
              <span style={{ marginLeft: "1rem" }}>Remove from favorites</span>
            </Button>
          ) : (
            <Button onClick={() => dispatch(addToFavorites(selectedCountry))}>
              <FavoriteBorderOutlinedIcon />
              <span style={{ marginLeft: "1rem" }}>Add to favorites</span>
            </Button>
          )}
        </StyledContainer>
      ) : (
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ width: "18rem", height: "15rem" }}
        />
      )}
    </>
  );
};

export default AddToFavorite;

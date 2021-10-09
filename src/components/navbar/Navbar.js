import { useHistory } from "react-router-dom";
import {
  Button,
  AppBar,
  Toolbar,
  Grid,
  Tooltip,
  Divider,
  Stack,
  styled,
} from "@mui/material";
import { useSelector, useDispatch } from "../../redux/hooks";
import { toggleThemeMode } from "../../redux/slices/rootSlice";
import { toggleTemperatureMode } from "../../redux/slices/countriesSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { mobile } from "../../utils/styles/screen-sizes";

const StyleAppBar = styled(AppBar)`
  margin-bottom: 4rem;
  height: 9rem;

  @media ${mobile} {
    height: 17.5rem;
    padding: 2rem 0;
  }
`;

const StyledGrid = styled(Grid)`
  @media ${mobile} {
    margin: 1.5rem 0;
  }
`;

export const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.root);
  const { temperatureMode } = useSelector((state) => state.countries);

  const handleToggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <StyleAppBar position="static" sx={{ mb: "4rem" }}>
      <Toolbar sx={{ height: "100%" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <span style={{ fontWeight: "bold" }}>Herolo weather task</span>
          </Grid>

          <StyledGrid item>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Button variant="contained" onClick={() => history.push("/")}>
                home
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push("/favorites")}
              >
                favorites
              </Button>
            </Stack>
          </StyledGrid>

          <Grid item>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Tooltip
                title={`${
                  themeMode === "light"
                    ? "Change to dark mode"
                    : "Change to light mode"
                }`}
              >
                <Button variant="contained" onClick={handleToggleTheme}>
                  {themeMode === "light" ? (
                    <DarkModeIcon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </Button>
              </Tooltip>

              <Button
                variant="contained"
                onClick={() => dispatch(toggleTemperatureMode())}
                sx={{ fontWeight: "bold" }}
              >
                {temperatureMode === "Metric" ? (
                  <Tooltip title="Change to Farenheit">
                    <ChangeCircleIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Change to Celcius">
                    <ChangeCircleOutlinedIcon />
                  </Tooltip>
                )}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </StyleAppBar>
  );
};

export default Navbar;

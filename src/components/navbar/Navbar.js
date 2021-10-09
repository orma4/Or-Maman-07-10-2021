import { useHistory } from "react-router-dom";
import { Button, AppBar, Toolbar, Grid } from "@mui/material";
import { useSelector, useDispatch } from "../../redux/hooks";
import { toggleThemeMode } from "../../redux/slices/rootSlice";
import { toggleTemperatureMode } from "../../redux/slices/countriesSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";

export const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.root);
  const { temperatureMode } = useSelector((state) => state.countries);

  const handleToggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <AppBar position="static" sx={{ mb: "40px" }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <span>Herolo weather</span>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={() => history.push("/")}>
              home
            </Button>
            <Button
              variant="contained"
              onClick={() => history.push("/favorites")}
            >
              favorites
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={handleToggleTheme}>
              {themeMode === "light" ? <DarkModeIcon /> : <Brightness4Icon />}
            </Button>

            <Button
              variant="contained"
              onClick={() => dispatch(toggleTemperatureMode())}
            >
              {temperatureMode === "Metric" ? "C" : "F"}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

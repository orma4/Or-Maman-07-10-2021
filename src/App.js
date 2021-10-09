import { useMemo } from "react";
import routes from "./routes";
import { Alert, Container, Paper, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import getDesignTokens from "./theme";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { useSelector } from "./redux/hooks";
import "./App.css";

function App() {
  const { error, themeMode } = useSelector((state) => state.root);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ minHeight: "100vh" }}>
        <Container sx={{ pt: "2rem", pb: "2rem" }}>
          <Navbar />

          {error && (
            <Alert
              severity="error"
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                zIndex: 99,
                width: isSmallScreen ? "auto" : "97%",
                m: "3.5rem 1rem 3.5rem",
              }}
            >
              {error}
            </Alert>
          )}

          <Switch>
            {routes.map((route) => {
              return (
                <Route path={route.path} key={route.path} exact>
                  {route.component}
                </Route>
              );
            })}
          </Switch>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}

export default App;

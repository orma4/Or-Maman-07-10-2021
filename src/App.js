import { useMemo } from "react";
import routes from "./routes";
import { Alert, Container, styled } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import getDesignTokens from "./theme";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { useSelector } from "./redux/hooks";
import "./App.css";

const AppBackground = styled("div")`
  /* background: ${(props) => props.theme.palette.primary.main}; */
  min-height: 100vh;
`;

function App() {
  const { error, themeMode } = useSelector((state) => state.root);

  const theme = useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBackground>
        <Container sx={{ pt: "20px" }}>
          <Navbar />

          {error && (
            <Alert
              severity="error"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 99,
                width: "97%",
                m: 1,
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
      </AppBackground>
    </ThemeProvider>
  );
}

export default App;

import routes from "./routes";
import Alert from "@mui/material/Alert";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { useSelector } from "./redux/hooks";
import "./App.css";

function App() {
  const { error } = useSelector((state) => state.root);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;

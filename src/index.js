import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux
import { store } from "./redux/store";
import { Provider as StoreProvider } from "react-redux";

// Material-UI
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    </Router>
  </Suspense>,
  document.getElementById("root")
);

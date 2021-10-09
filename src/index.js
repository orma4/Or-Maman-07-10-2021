import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { store } from "./redux/store";
import { Provider as StoreProvider } from "react-redux";

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </Router>
  </Suspense>,
  document.getElementById("root")
);

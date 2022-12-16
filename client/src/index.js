import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FetchDataProvider from "./Context/FetchData";
import { HashRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <FetchDataProvider>
      <App />
    </FetchDataProvider>
  </HashRouter>
);

reportWebVitals();

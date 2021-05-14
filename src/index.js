import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./Application/CSS/index.css";
import App from "./App";
import { GlobalStateWrapper, GlobalFunctionsWrapper } from "./Context";

// React
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStateWrapper>
        <GlobalFunctionsWrapper>
          <App />
        </GlobalFunctionsWrapper>
      </GlobalStateWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

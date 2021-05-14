import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./Application/CSS/app.css";
import Routes from "./Routes";
import Application from "./Application/Application";

const App = () => {
  return (
    <Switch>
      <Route path={Routes.APP_BASE_ROUTE}>
        <Application />
      </Route>
      <Route component={() => <Redirect to={Routes.ALL_DASHBOARDS_PAGE} />} />
    </Switch>
  );
};

export default App;

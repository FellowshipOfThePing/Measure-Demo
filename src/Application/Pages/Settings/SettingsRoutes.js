import React from "react";
import { Switch, Route } from "react-router-dom";

import AccountSettingsPage from "./AccountSettingsPage";
import WorkspaceSettingsPage from "./WorkspaceSettingsPage";
import Routes from "../../../Routes";

const SettingsRoutes = () => {
  return (
    <Switch>
      <Route exact path={Routes.ACCOUNT_SETTINGS_PAGE}>
        <AccountSettingsPage />
      </Route>
      <Route exact path={Routes.WORKSPACE_SETTINGS_PAGE}>
        <WorkspaceSettingsPage />
      </Route>
    </Switch>
  );
};

export default SettingsRoutes;

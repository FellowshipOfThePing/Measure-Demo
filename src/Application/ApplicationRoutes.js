import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Routes from "../Routes";
import {
  DashboardPage,
  SettingsPage,
  DataSourcesPage,
  ChannelPage,
} from "./Pages";

const ApplicationRoutes = () => {
  return (
    <Switch>
      <Route exact path={`${Routes.CHANNEL_PAGE}/:channelId`}>
        <ChannelPage />
      </Route>
      <Route exact path={`${Routes.DASHBOARD_PAGE}/:dashboardId`}>
        <DashboardPage />
      </Route>
      <Route path={Routes.SOURCES_PAGE}>
        <DataSourcesPage />
      </Route>
      <Route path={Routes.SETTINGS_PAGE}>
        <SettingsPage />
      </Route>
      <Route component={() => <Redirect to={Routes.ALL_DASHBOARDS_PAGE} />} />
    </Switch>
  );
};

export default ApplicationRoutes;

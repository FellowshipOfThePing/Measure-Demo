import React, { useContext, useEffect } from "react";
import isEqual from "lodash.isequal";
import { v4 as uuidv4 } from "uuid";

import { GlobalStateContext, GlobalFunctionsContext } from ".";
import { ConsoleHelper, toTitleCase } from "../utils";
import UserData from "./DummyUserData";
import MetricData from "./DummyMetricData";
import MetricList from "./DummyMetricList";

const LINE_COLORS = [
  "#98DAFF",
  "#9CB8FF",
  "#C2AAF3",
  "#FF98BD",
  "#FFC998",
  "#FFF59C",
  "#F3D6AA",
];

const GlobalFunctionsWrapper = ({ children }) => {
  const {
    setScreenLoading,
    userId,
    setUserName,
    setUserEmail,
    workspaceIds,
    setWorkspaceIds,
    currentWorkspaceId,
    setWorkspaceName,
    setJobTitle,
    team,
    setTeam,
    channels,
    setChannels,
    dashboards,
    setDashboards,
    dashboardLayouts,
    setDashboardLayouts,
    dashboardWidgets,
    setDashboardWidgets,
    setWidgetData,
    metricNamesList,
    storeUserInfo,
    storeWorkspaceIds,
    storeDataSources,
    storeMetricNames,
  } = useContext(GlobalStateContext);

  // User Functions

  const storeLoginInfo = (data) => {
    storeUserInfo(data.userInfo);
    storeWorkspaceIds(data.workspaceIds);
  };

  const updateUserName = (newName) => {
    setUserName(newName);
    updateNameInTeam(newName);
  };

  const updateNameInTeam = (newName) => {
    let teamCopy = JSON.parse(JSON.stringify(team));
    for (let i = 0; i < teamCopy.length; i++) {
      if (teamCopy[i].user_id === userId) {
        teamCopy[i].full_name = newName;
        break;
      }
    }
    setTeam(teamCopy);
  };

  const updateUserEmail = (newEmail) => {
    setUserEmail(newEmail);
    updateEmailInTeam(newEmail);
  };

  const updateEmailInTeam = (newEmail) => {
    let teamCopy = JSON.parse(JSON.stringify(team));
    for (let i = 0; i < teamCopy.length; i++) {
      if (teamCopy[i].user_id === userId) {
        teamCopy[i].email = newEmail;
        break;
      }
    }
    setTeam(teamCopy);
  };

  // Membership Functions

  const updateJobTitle = (newRole) => {
    setJobTitle(newRole);
    updateJobTitleInTeam(newRole);
  };

  const updateJobTitleInTeam = (newRole) => {
    let teamCopy = JSON.parse(JSON.stringify(team));
    for (let i = 0; i < teamCopy.length; i++) {
      if (teamCopy[i].user_id === userId) {
        teamCopy[i].job_title = newRole;
        break;
      }
    }
    setTeam(teamCopy);
  };

  // Workspace Functions

  const updateWorkspaceName = (newName) => {
    setWorkspaceName(newName);
    changeNameInWorkspaceIds(newName);
  };

  const changeNameInWorkspaceIds = (newName) => {
    let newWorkspaces = JSON.parse(JSON.stringify(workspaceIds));
    for (let i = 0; i < newWorkspaces.length; i++) {
      if (newWorkspaces[i].workspace_id === currentWorkspaceId) {
        newWorkspaces[i].workspace_name = newName;
        break;
      }
    }
    setWorkspaceIds(newWorkspaces);
  };

  const changeJoinedInWorkspaces = (workspaceId) => {
    let newWorkspaces = workspaceIds;
    for (let i = 0; i < newWorkspaces.length; i++) {
      if (newWorkspaces[i].workspace_id === workspaceId) {
        newWorkspaces[i].joined = 1;
        break;
      }
    }
    setWorkspaceIds(newWorkspaces);
  };

  // Channel Functions

  const getChannelIndex = (channelId) => {
    let channelsCopy = JSON.parse(JSON.stringify(channels));
    for (let i = 0; i < channelsCopy.length; i++) {
      if (channelsCopy[i].channelId === channelId) {
        return i;
      }
    }
    ConsoleHelper(`Channel Index not found for Channel ${channelId}`);
    return null;
  };

  const createChannel = (newChannel) => {
    newChannel.channelId = uuidv4();
    let channelsCopy = JSON.parse(JSON.stringify(channels));
    for (let i = 0; i < channelsCopy.length; i++) {
      if (channelsCopy[i].channelId === newChannel.channelId) {
        return;
      }
    }
    channelsCopy.push(newChannel);
    setChannels(channelsCopy);
    return newChannel.channelId;
  };

  const editChannel = (updatedParameter, newChannel) => {
    let channelsCopy = JSON.parse(JSON.stringify(channels));
    for (let i = 0; i < channelsCopy.length; i++) {
      if (channelsCopy[i].channelId === newChannel.channelId) {
        channelsCopy[i][updatedParameter] = newChannel[updatedParameter];
        setChannels(channelsCopy);
        break;
      }
    }
  };

  const deleteChannel = (channelId) => {
    let channelsCopy = JSON.parse(JSON.stringify(channels));
    for (let i = 0; i < channelsCopy.length; i++) {
      if (channelsCopy[i].channelId === channelId) {
        channelsCopy.splice(i, 1);
        setChannels(channelsCopy);
        break;
      }
    }
  };

  // Dashboard Functions

  const getNewWidgetYCoordinate = (layout) => {
    let maxY = 0;
    for (let i = 0; i < layout.length; i++) {
      if (layout[i].y + layout[i].h > maxY) {
        maxY = layout[i].y + layout[i].h;
      }
    }
    return maxY;
  };

  const getDashboardIndex = (dashboardId) => {
    let dashboardsCopy = JSON.parse(JSON.stringify(dashboards));
    for (let i = 0; i < dashboardsCopy.length; i++) {
      if (dashboardsCopy[i].dashboardId === dashboardId) {
        return i;
      }
    }
    ConsoleHelper(`Dashboard Index not found for Dashboard ${dashboardId}`);
    return null;
  };

  const createDashboard = (newDashboard) => {
    newDashboard.dashboardId = uuidv4();
    let dashboardsCopy = JSON.parse(JSON.stringify(dashboards));
    for (let i = 0; i < dashboardsCopy.length; i++) {
      if (dashboardsCopy[i].dashboardId === newDashboard.dashboardId) {
        return;
      }
    }
    dashboardsCopy.push(newDashboard);
    setDashboards(dashboardsCopy);
    return newDashboard.dashboardId;
  };

  const editDashboardInfo = (newDashboard) => {
    let dashboardsCopy = JSON.parse(JSON.stringify(dashboards));
    for (let i = 0; i < dashboardsCopy.length; i++) {
      if (dashboardsCopy[i].dashboardId === newDashboard.dashboardId) {
        dashboardsCopy[i] = { ...dashboardsCopy[i], ...newDashboard };
        setDashboards(dashboardsCopy);
        break;
      }
    }
  };

  const updateDashboardLayout = (dashboardId, newLayout) => {
    if (!isEqual(newLayout, dashboardLayouts[dashboardId])) {
      let layoutsCopy = {
        ...dashboardLayouts,
        ...{ [dashboardId]: newLayout },
      };
      setDashboardLayouts(layoutsCopy);
    }
  };

  const deleteDashboard = (dashboardId) => {
    let dashboardsCopy = JSON.parse(JSON.stringify(dashboards));
    for (let i = 0; i < dashboardsCopy.length; i++) {
      if (dashboardsCopy[i].dashboardId === dashboardId) {
        dashboardsCopy.splice(i, 1);
        setDashboards(dashboardsCopy);
        break;
      }
    }
  };

  const syncDashboardData = (dashboardId) => {
    if (dashboardLayouts[dashboardId]) {
      return;
    }
    let layouts = {};
    for (let i = 0; i < dashboards.length; i++) {
      let dashboardId = dashboards[i].dashboardId;
      layouts[dashboardId] = dashboards[i].layout;
    }
    setDashboardLayouts(layouts);
    setDashboardWidgets(UserData.widgets);
    setWidgetData(MetricData);

    if (metricNamesList.length === 0) {
      storeDataSources(UserData.workspaceIntegrations);
      storeMetricNames(MetricList);
    }
  };

  // Widget Functions

  const getLayoutWidgetIndex = (widgetId, dashboardId) => {
    if (!widgetId) return;
    let layoutsCopy = JSON.parse(JSON.stringify(dashboardLayouts));
    for (let i = 0; i < layoutsCopy[dashboardId].length; i++) {
      if (layoutsCopy[dashboardId][i].i === widgetId) {
        return i;
      }
    }
  };

  const createWidget = (
    dashboardId,
    title,
    icon,
    metricName,
    type,
    chartType,
    period,
    sample = "D"
  ) => {
    let widgetId = uuidv4();
    let randomColorIndex = Math.floor(Math.random() * 3) % 4;

    let newWidget = {
      widgetId,
      dashboardId,
      workspaceId: currentWorkspaceId,
      title,
      type: type,
      subType: chartType,
      icon: {
        type: "emoji",
        value: icon,
      },
      metrics: [
        {
          metricName,
          timePeriod: period ? [period] : null,
          sample: sample,
          style: {
            area: false,
            color: LINE_COLORS[randomColorIndex],
            line: "linear",
          },
        },
      ],
    };

    let widgetObject = { [widgetId]: newWidget };
    syncDashboardWidgets(widgetObject);
    return widgetId;
  };

  const syncDashboardWidgets = (newWidgets) => {
    let mergedWidgets = { ...dashboardWidgets, ...newWidgets };
    setDashboardWidgets(mergedWidgets);
  };

  const editWidget = (widgetId, newWidget) => {
    let widgetObject = { [widgetId]: newWidget };
    syncDashboardWidgets(widgetObject);
  };

  const deleteWidget = (dashboardId, widgetIndex) => {
    if (!dashboardId || widgetIndex === undefined) return;
    let layoutsCopy = JSON.parse(JSON.stringify(dashboardLayouts));
    layoutsCopy[dashboardId].splice(widgetIndex, 1);
    setDashboardLayouts(layoutsCopy);
  };

  // Invitation Functions

  const inviteUser = (email) => {
    return null;
  };

  useEffect(() => {
    storeLoginInfo(UserData);
    setScreenLoading(false);
  }, []);

  return (
    <GlobalFunctionsContext.Provider
      value={{
        toTitleCase,
        getNewWidgetYCoordinate,
        changeJoinedInWorkspaces,

        updateUserName,
        updateNameInTeam,

        updateUserEmail,
        updateEmailInTeam,

        updateWorkspaceName,

        updateJobTitle,
        updateJobTitleInTeam,

        getChannelIndex,
        createChannel,
        editChannel,
        deleteChannel,

        getDashboardIndex,
        createDashboard,
        editDashboardInfo,
        deleteDashboard,
        updateDashboardLayout,

        createWidget,
        editWidget,
        getLayoutWidgetIndex,
        deleteWidget,

        inviteUser,
        syncDashboardData,
      }}
    >
      {children}
    </GlobalFunctionsContext.Provider>
  );
};

export default GlobalFunctionsWrapper;

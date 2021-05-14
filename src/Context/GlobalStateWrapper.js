import React, { useState } from "react";

import { GlobalStateContext } from ".";
import { ConsoleHelper, toTitleCase } from "../utils";
import { BrandIcons20 } from "../Application/Components";
import { useStateWithRef } from "../Hooks";
import UserData from "./DummyUserData";

const GlobalStateWrapper = ({ children }) => {
  // ======== CONSTANTS ======== //
  const INTEGRATION_ID_BANK = {
    stripe: 1,
    "google analytics": 3,
  };

  // ======== USER INFO ======== //

  const [userId, setUserId, userIdRef] = useStateWithRef(UserData.userInfo.user_id);
  const [userName, setUserName] = useState(UserData.userInfo.full_name);
  const [userEmail, setUserEmail] = useState(UserData.userInfo.email);
  const [accountValid, setAccountValid] = useState(UserData.userInfo.account_valid);
  const [profileImage, setProfileImage] = useState(UserData.userInfo.profile_image);
  const [onboarded, setOnboarded] = useState(UserData.userInfo.onboarded);
  const [canInvite, setCanInvite] = useState(UserData.userInfo.can_invite);
  const [remainingInvites, setRemainingInvites] = useState(UserData.userInfo.remaining_invites);
  const [workspaceIds, setWorkspaceIds] = useState(UserData.workspaceIds);

  // ======== CURRENT WORKSPACE ID (REF INCLUDED FOR EVENT LISTENERS) ======== //

  const [currentWorkspaceId, setCurrentWorkspaceId, currentWorkspaceIdRef] = useStateWithRef(UserData.userInfo.current_workspace_id);

  // ======== CURRENT WORKSPACE ======== //

  const [workspaceName, setWorkspaceName] = useState(UserData.workspaceDetails.workspace_name);
  const [workspaceSize, setWorkspaceSize] = useState(UserData.workspaceDetails.workspace_size);
  const [ownerStatus, setOwnerStatus] = useState(UserData.workspaceDetails.owner_status);
  const [jobTitle, setJobTitle] = useState(UserData.workspaceDetails.job_title);
  const [visited, setVisited] = useState(null);
  const [workspaceImage, setWorkspaceImage] = useState(null);

  // ======== TEAM ======== //

  const [team, setTeam, teamRef] = useStateWithRef(UserData.workspaceTeam);

  // ======== DATA SOURCES ======== //

  const [integrationList, setIntegrationList] = useState(UserData.workspaceIntegrations);
  const [integrationListLoaded, setIntegrationListLoaded] = useState(true);

  // ======== CHANNELS & DASHBOARDS ======== //

  const [channels, setChannels, channelsRef] = useStateWithRef(UserData.channels);
  const [dashboards, setDashboards, dashboardsRef] = useStateWithRef(UserData.dashboards);
  const [dashboardLayouts, setDashboardLayouts, dashboardLayoutsRef] = useStateWithRef({});
  const [dashboardWidgets, setDashboardWidgets, dashboardWidgetsRef] = useStateWithRef({});
  const [widgetData, setWidgetData, widgetDataRef] = useStateWithRef({});

  // ======== METRIC DATA ======== //

  const [sourcesList, setSourcesList] = useState([]);
  const [metricNamesObject, setMetricNamesObject] = useState({});
  const [metricNamesList, setMetricNamesList] = useState([]);

  // ======== LOADING STATES ======== //

  const [screenLoading, setScreenLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // ======== NOTIF CARD STATES ======== //

  const [notifCardOpen, setNotifCardOpen] = useState(false);
  const [notifCardBrand, setNotifCardBrand] = useState("");
  const [notifCardStatus, setNotifCardStatus] = useState("");

  // ======== STORAGE FUNCTIONS ======== //

  const storeUserInfo = (info) => {
    ConsoleHelper("[DATA] Loaded User Info");
    ConsoleHelper(info);
    setUserId(info.user_id);
    setUserName(info.full_name);
    setUserEmail(info.email);
    setAccountValid(info.data_registered);
    setOnboarded(info.onboarded);
    setProfileImage(info.profile_image || "");
    setCanInvite(info.can_invite === 1);
    setRemainingInvites(info.remaining_invites);
    setCurrentWorkspaceId(info.current_workspace_id);
  };

  const storeWorkspaceIds = (workspaceIds) => {
    ConsoleHelper("[DATA] Loaded Workspace Ids");
    ConsoleHelper(workspaceIds);
    setWorkspaceIds(workspaceIds);
  };

  const storeWorkspaceDetails = (workspace) => {
    ConsoleHelper("[DATA] Loaded Workspace Details");
    ConsoleHelper(workspace);
    setWorkspaceName(workspace.workspace_name || "My First Workspace");
    setOwnerStatus(workspace.owner_status);
    setJobTitle(workspace.job_title || "");
    setVisited(workspace.made_first_visit);
    setWorkspaceImage(workspace.workspace_image || "");
  };

  const storeWorkspaceTeam = (team) => {
    ConsoleHelper("[DATA] Loaded Team");
    ConsoleHelper(team);
    setTeam(team);
  };

  const storeDataSources = (dataSources) => {
    ConsoleHelper("[DATA] Loaded Integrations");
    ConsoleHelper(dataSources);
    setIntegrationList(dataSources);
    setIntegrationListLoaded(true);
    let newSourcesList = [];
    for (let i = 0; i < dataSources.length; i++) {
      let sourceName = dataSources[i].source_type_name;
      newSourcesList.push({
        sourceName,
        title: toTitleCase(sourceName),
        type: "Application",
        icon: BrandIcons20[sourceName.toLowerCase()],
      });
    }
    setSourcesList(newSourcesList);
  };

  const storeChannels = (channels) => {
    ConsoleHelper("[DATA] Loaded Channels");
    ConsoleHelper(channels);
    setChannels(channels);
  };

  const storeDashboardIds = (dashboardIds) => {
    ConsoleHelper("[DATA] Loaded Dashboard Ids");
    ConsoleHelper(dashboardIds);
    setDashboards(dashboardIds);
  };

  const storeMetricNames = (metricNames) => {
    ConsoleHelper("[DATA] Loaded Metric Ids");
    ConsoleHelper(metricNames);
    setMetricNamesObject(metricNames);
    let newMetricNamesList = [];
    for (const [metricName, metricInfo] of Object.entries(metricNames)) {
      let sourceName = metricInfo.sourceName;
      let newMetricObject = {
        icon: null,
        sourceName: sourceName,
        title: metricInfo.title,
        metricName: metricName,
        units: metricInfo.units,
        sumStrategy: metricInfo.sumStrategy,
        type: null,
      };
      newMetricNamesList.push(newMetricObject);
    }
    setMetricNamesList(newMetricNamesList);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        INTEGRATION_ID_BANK,

        screenLoading,
        setScreenLoading,

        userId,
        setUserId,
        userIdRef,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        accountValid,
        setAccountValid,
        profileImage,
        setProfileImage,
        onboarded,
        setOnboarded,
        canInvite,
        setCanInvite,
        remainingInvites,
        setRemainingInvites,

        workspaceIds,
        setWorkspaceIds,
        currentWorkspaceId,
        setCurrentWorkspaceId,
        currentWorkspaceIdRef,

        workspaceName,
        setWorkspaceName,
        workspaceSize,
        setWorkspaceSize,
        ownerStatus,
        setOwnerStatus,
        jobTitle,
        setJobTitle,
        visited,
        setVisited,
        workspaceImage,
        setWorkspaceImage,

        team,
        setTeam,
        teamRef,

        integrationList,
        setIntegrationList,
        integrationListLoaded,

        channels,
        setChannels,
        channelsRef,
        dashboards,
        setDashboards,
        dashboardsRef,
        dashboardLayouts,
        setDashboardLayouts,
        dashboardLayoutsRef,
        dashboardWidgets,
        setDashboardWidgets,
        dashboardWidgetsRef,
        widgetData,
        setWidgetData,
        widgetDataRef,
        sourcesList,
        setSourcesList,
        metricNamesList,
        setMetricNamesList,
        metricNamesObject,
        setMetricNamesObject,

        authLoading,
        setAuthLoading,

        notifCardOpen,
        setNotifCardOpen,
        notifCardBrand,
        setNotifCardBrand,
        notifCardStatus,
        setNotifCardStatus,

        storeUserInfo,
        storeWorkspaceIds,
        storeWorkspaceDetails,
        storeWorkspaceTeam,
        storeDataSources,
        storeChannels,
        storeDashboardIds,
        storeMetricNames,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateWrapper;

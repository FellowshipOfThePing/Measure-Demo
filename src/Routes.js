const ONBOARDING_BASE_ROUTE = "/onboarding";
const APP_BASE_ROUTE = "/home";
const DASHBOARD_BASE_ROUTE = `${APP_BASE_ROUTE}/dashboard`;

const Routes = {
  ONBOARDING_BASE_ROUTE,
  WELCOME_PAGE: `${ONBOARDING_BASE_ROUTE}/welcome`,
  LOGIN_PAGE: `${ONBOARDING_BASE_ROUTE}/login`,
  RESET_PASSWORD_PAGE: `${ONBOARDING_BASE_ROUTE}/resetPassword`,
  REGISTER_PAGE: `${ONBOARDING_BASE_ROUTE}/register`,
  STAY_UPDATED_PAGE: `${ONBOARDING_BASE_ROUTE}/stayUpdated`,

  APP_BASE_ROUTE,
  CHANNEL_PAGE: `${APP_BASE_ROUTE}/channel`,
  ALL_DASHBOARDS_PAGE: `${APP_BASE_ROUTE}/channel/all`,
  SOURCES_PAGE: `${APP_BASE_ROUTE}/sources`,
  FEEDBACK_PAGE: `${APP_BASE_ROUTE}/feedback`,
  SETTINGS_PAGE: `${APP_BASE_ROUTE}/settings`,
  ACCOUNT_SETTINGS_PAGE: `${APP_BASE_ROUTE}/settings/account`,
  WORKSPACE_SETTINGS_PAGE: `${APP_BASE_ROUTE}/settings/workspace`,

  DASHBOARD_BASE_ROUTE,
  DASHBOARD_PAGE: `${DASHBOARD_BASE_ROUTE}`,

  LOADING_PAGE: `/loading`,
  GOOGLE_PAGE: `/googleIntegration`,
  JOIN_PAGE: `/join`
};

export default Routes;
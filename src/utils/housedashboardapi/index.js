export const DASHBOARDURL = () => {
  const url = import.meta.env.VITE_DASHBOARD_END_POINT + "Housing";

  return url;
};

export const WEATHERDASHBOARDURL = () => {
  const url = import.meta.env.VITE_WEATHER_DASHBOARD_END_POINT;

  return url;
};

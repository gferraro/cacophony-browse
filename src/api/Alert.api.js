import CacophonyApi from "./CacophonyApi";

export default { getAlerts, addNewAlert };

function getAlerts() {
  return CacophonyApi.get("/api/v1/alerts");
}

function addNewAlert(alertName) {
  const suppressGlobalMessaging = true;
  return CacophonyApi.post(
    "/api/v1/alerts",
    { alertName: alertName },
    suppressGlobalMessaging
  );
}

import { lmsClient } from "./api";

const DASHBOARD = "dashboard";

export const getDashboardData = async () => {
  const res = await lmsClient.get(DASHBOARD);

  return res?.data;
};

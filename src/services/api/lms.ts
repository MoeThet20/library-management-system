import { getAxiosInstance } from "./instanceGenerator";

export const lmsClient = getAxiosInstance({
  baseURL: "/api",
});

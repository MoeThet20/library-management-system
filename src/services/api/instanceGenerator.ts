import axios, { AxiosRequestConfig } from "axios";
import { asyncErrorWrapper } from "@/utils/helper";
import { setupInterceptorsTo } from "./Interceptors";

function checkJwt() {
  return true;
}

function callJWT() {
  return {
    value: "",
  };
}

function formatHeaders(needJwt: boolean, headers: any) {
  if (needJwt) {
    if (checkJwt()) {
      return { ...headers, Authorization: `Bearer ${callJWT().value}` };
    }
    return null;
  }
  return headers;
}

export function getAxiosInstance(configurations?: AxiosRequestConfig) {
  const axiosInstance = axios.create(configurations);
  setupInterceptorsTo(axiosInstance);
  return {
    axios: axiosInstance,
    get: asyncErrorWrapper(
      async (endpoint: string, headers = {}, needJwt: boolean = true) => {
        headers = formatHeaders(needJwt, headers);
        return await axiosInstance.get(endpoint, { headers });
      }
    ),

    post: asyncErrorWrapper(
      async (
        endpoint: string,
        data = {},
        headers = {},
        needJwt: boolean = true
      ) => {
        headers = formatHeaders(needJwt, headers);
        return await axiosInstance.post(endpoint, data, { headers: headers });
      }
    ),

    put: asyncErrorWrapper(
      async (
        endpoint: string,
        data = {},
        headers = {},
        needJwt: boolean = true
      ) => {
        headers = formatHeaders(needJwt, headers);
        return await axiosInstance.put(endpoint, data, { headers: headers });
      }
    ),

    patch: asyncErrorWrapper(
      async (
        endpoint: string,
        data = {},
        headers = {},
        needJwt: boolean = true
      ) => {
        headers = formatHeaders(needJwt, headers);
        return await axiosInstance.patch(endpoint, data, { headers: headers });
      }
    ),

    delete: asyncErrorWrapper(
      async (endpoint: string, headers = {}, needJwt: boolean = true) => {
        headers = formatHeaders(needJwt, headers);
        return await axiosInstance.delete(endpoint, { headers: headers });
      }
    ),
  };
}

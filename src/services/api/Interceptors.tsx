import { enableErrorMessageModal } from "@/redux/features/messageModalSlice";
import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "@/redux/store";
import { disableLoadingModal } from "@/redux/features/loadingSlice";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  //   const headers = {
  //     Authorization: "Bearer " + sessionStorage.getItem("jwt"),
  //   };

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  store.dispatch(disableLoadingModal());
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  store.dispatch(disableLoadingModal());
  const isInternalError = error.response?.status === 500;

  const message = isInternalError
    ? "Something Wrong"
    : error?.response?.data?.error;
  store.dispatch(enableErrorMessageModal(message));

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

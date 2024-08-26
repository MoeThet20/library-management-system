import { enableErrorMessageModal } from "@/redux/features/messageModalSlice";
import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "@/redux/store";
import {
  disableLoadingModal,
  enableLoadingModal,
} from "@/redux/features/loadingSlice";
import { LOADING_DISABLE } from "@/const/routes";

const BASE_URL = "http://localhost:3000";
const SECOND_INDEX = 1;

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  //   const headers = {
  //     Authorization: "Bearer " + sessionStorage.getItem("jwt"),
  //   };
  let isDisableLoading = false;
  if (typeof window !== "undefined") {
    const currentUrl = window.location.href;
    const desireUrl = currentUrl.split(BASE_URL)[SECOND_INDEX];
    isDisableLoading = LOADING_DISABLE.includes(desireUrl);
  }

  !isDisableLoading && store.dispatch(enableLoadingModal());
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  store.dispatch(disableLoadingModal());
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import {
  GraphqlError,
  manageErrors,
  manageGraphqlErrors,
} from "../errors.utils";

export const getTokensFromStorage = async () => {
  const tokenValue = await AsyncStorage.getItem("token");
  const accessToken: accessToken = tokenValue ? JSON.parse(tokenValue) : {};

  return { accessToken };
};

const updateHeaders = async (config: AxiosRequestConfig) => {
  const axiosConfig = config;

  const headers: AxiosRequestHeaders = { ...axiosConfig.headers };

  const isTokenRequired =
    headers.isTokenRequired !== undefined ? headers.isTokenRequired : true;

  const tokens = isTokenRequired ? await getTokensFromStorage() : undefined;

  if (isTokenRequired && tokens) {
    headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  axiosConfig.headers = headers;

  return axiosConfig;
};

export const initAxios = () => {
  axios.interceptors.request.use(
    async (config) =>
      // Set Headers and Config to the request
      updateHeaders(config),
    (error) =>
      // Do something with request error
      Promise.reject(error)
  );

  axios.interceptors.response.use(
    async (response) => {
      // With Graphql, status is 200 but errors are in response
      if (response?.data?.errors) {
        const { config } = response;

        // @ts-ignore
        if (
          response.data.errors[0].extensions?.exception?.status === 401 &&
          !config.retry
        ) {
          // @ts-ignore
          config.retry = true;
        }

        return manageGraphqlErrors(response.data.errors as GraphqlError[]);
      }
      // All fine
      return response;
    },
    async (error) => {
      const config = error?.config;

      // Check if errors from auth (401) and avoid infinite loop
      if (error?.response?.status === 401 && !config.retry) {
        config.retry = true;
      }

      return manageErrors(error);
    }
  );
};

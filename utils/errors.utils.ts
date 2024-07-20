import { AxiosError } from "axios";
import { map } from "lodash";

export const UNKNOWN_ERROR = "UNKNOWN_ERROR";
export const NETWORK_ERROR = "NETWORK_ERROR";
export const UNAVAILABLE_ERROR = "UNAVAILABLE_ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR";
export const REFRESH_TOKEN_ERROR = "REFRESH_TOKEN_ERROR";

export const INVALID_AUTH_MESSAGE = "invalid_username_or_password";
export const UNAUTHORIZED_MESSAGE = "Unauthorized user";

export const isCommonError = (error: string) => {
  const commonErrors = [
    UNKNOWN_ERROR,
    NETWORK_ERROR,
    UNAVAILABLE_ERROR,
    LOGIN_ERROR,
    UNAUTHORIZED_ERROR,
    REFRESH_TOKEN_ERROR,
  ];

  return commonErrors.includes(error);
};

// todo: for back end refactor, ask unique error format
export interface BackEndError {
  error?: {
    message: string;
  };
  error_description?: string;
  message?: string;
  messages?: string[];
}

export type GraphqlError = {
  message: string;
};

export const manageErrors = (error: AxiosError<BackEndError>) =>
  new Promise((_, reject) => {
    if (error.response?.data?.messages) {
      const errors: string[] = error.response.data.messages.map(
        (message: string) => message
      );
      reject(errors);
    }

    // Check common error
    if (error.response?.data?.error_description) {
      // Error 400 Bad Request ISB
      const errorDesc = error.response.data.error_description;

      let errorMessage = errorDesc;

      switch (errorDesc) {
        case INVALID_AUTH_MESSAGE:
          errorMessage = LOGIN_ERROR;
          break;
        case UNAUTHORIZED_MESSAGE:
          errorMessage = UNAUTHORIZED_ERROR;
          break;
        default:
          break;
      }

      const errors = [errorMessage];
      reject(errors);
    } else if (error.response?.data?.message) {
      // Error 404 or navigator error
      const errors = [error.response.data.message];
      reject(errors);
    } else if (error.response?.data?.error?.message) {
      // Error API Management
      const errors = [error.response.data.error.message];
      reject(errors);
    } else if (
      error.response?.data &&
      typeof error.response?.data === "string"
    ) {
      // Error ISB with exception as text
      const errors = [error.response.data];
      reject(errors);
    } else if (error.response?.status === 503) {
      // Service unavailable
      const errors = [UNAVAILABLE_ERROR];
      reject(errors);
    } else if (!error.response) {
      // CORS or Network Error
      const errors = [NETWORK_ERROR];
      reject(errors);
    }

    // Another error
    reject(error.response);
  });

export const manageGraphqlErrors = (graphqlErrors: GraphqlError[]) =>
  new Promise((_, reject) => {
    const errors: string[] = map(
      graphqlErrors,
      (graphqlError) => graphqlError.message
    );
    reject(errors);
  });

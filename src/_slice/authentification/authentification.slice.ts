import { createAccountModel } from "@/src/models/createAccount.model";
import { getTokensFromStorage } from "@/utils/theme/axiosInterceptor.utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAccountApi, logConnectionApi } from "./authentification.api";

type AuthentificationState = {
  isConnected: boolean;
  isLoading: boolean;
  hasError: boolean;
  createAccountIsLoading: boolean;
  isLogoutLoading: false;
  token: string;
};

const authInitialState: AuthentificationState = {
  isConnected: false,
  isLogoutLoading: false,
  isLoading: false,
  createAccountIsLoading: false,
  hasError: false,
  token: "",
};

export const sliceName = "authentification";

export const login = createAsyncThunk<
  {
    isConnected: boolean;
    accessToken: string;
  },
  {
    data: { email: string; password: string };
    onSuccessCallback: () => void;
    onErrorCallback: () => void;
  }
>(
  `${sliceName}/login`,
  async ({ data, onSuccessCallback }, { rejectWithValue }) => {
    try {
      let isConnected = false;

      const accessToken = await logConnectionApi(data.email, data.password);

      if (accessToken) {
        isConnected = true;
        await AsyncStorage.setItem("isConnected", JSON.stringify(true));
        await AsyncStorage.setItem("token", JSON.stringify(accessToken));
      }

      if (onSuccessCallback) {
        onSuccessCallback();
      }

      return { isConnected, accessToken };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAccount = createAsyncThunk<
  boolean,
  { data: createAccountModel; onSuccessCallback: Function }
>(
  `${sliceName}/createAccount`,
  async ({ data, onSuccessCallBack }, { rejectWithValue }) => {
    try {
      await createAccountApi(data);

      if (onSuccessCallBack) {
        onSuccessCallBack();
      }

      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const initTokenFromStorage = createAsyncThunk<{
  isConnected: boolean;
  tokenIsb?: string;
  tokenIss?: string;
  licenseAgreementRequired?: boolean;
}>(
  `${sliceName}/initTokenFromStorage`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const userIsConnected =
        (await AsyncStorage.getItem("isConnected")) === "true";

      if (userIsConnected) {
        const { accessToken } = await getTokensFromStorage();

        return {
          isConnected: true,
          accessToken: accessToken,
        };
      }
      return { isConnected: false };
    } catch (error) {
      //logout
      return rejectWithValue(error);
    }
  }
);

const authentificationSlice = createSlice({
  name: sliceName,
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(login.rejected, () => ({
      ...authInitialState,
      hasError: true,
    }));
    builder.addCase(login.fulfilled, (state, action) => {
      const { isConnected, accessToken } = action.payload;
      state.isLoading = false;
      state.isConnected = isConnected;
      state.token = accessToken;
    });

    builder.addCase(createAccount.pending, (state) => {
      state.createAccountIsLoading = true;
    });
    builder.addCase(createAccount.rejected, (state) => {
      state.createAccountIsLoading = false;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.createAccountIsLoading = false;
    });
  },
});

export default authentificationSlice.reducer;

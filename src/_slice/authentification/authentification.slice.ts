import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type AuthentificationState = {
  isConnected: boolean;
  isTokenLoading: boolean;
  isLogoutLoading: false;
  token: string;
};

const authInitialState: AuthentificationState = {
  isConnected: false,
  isLogoutLoading: false,
  isTokenLoading: true,
  token: "",
};

export const sliceName = "authentification";

export const login = createAsyncThunk(
  `${sliceName}/login`,
  async (data, { rejectWithValue, dispatch }) => {}
);

const authentificationSlice = createSlice({
  name: sliceName,
  initialState: authInitialState,
  reducers: {},
});

export default authentificationSlice.reducer;

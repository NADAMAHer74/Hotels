import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { signInUser, signUpUser } from "../APIs/AuthApi";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    token: Cookies.get("token") || null,
    isAuthenticated: !!Cookies.get("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token);
      Cookies.set("user", JSON.stringify(action.payload.user));
    });

    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token);
      Cookies.set("user", JSON.stringify(action.payload.user));
    });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;

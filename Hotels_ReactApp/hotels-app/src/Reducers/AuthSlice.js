import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { signInUser, signUpUser } from "../APIs/AuthApi";


export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: Cookies.get('token') || null,
        isAuthenticated: !!Cookies.get('token'),
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = null;
            state.error = null;
            Cookies.remove('token');
        }
    },

    extraReducers: (builder) => {
        //Sign UP
        builder.addCase(signUpUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            Cookies.set('token', action.payload.token);
        });
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //Sign IN
        builder.addCase(signInUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            Cookies.set('token', action.payload.token);
        });
        builder.addCase(signInUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer
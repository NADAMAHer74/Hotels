import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:2000/api/";

export const signUpUser = createAsyncThunk("auth/signUpUser",
    async ({ firstName, lastName, email, phone, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/signup`, {
                firstName,
                lastName,
                email,
                phone,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    })


export const signInUser = createAsyncThunk("auth/signInUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/signin`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    })
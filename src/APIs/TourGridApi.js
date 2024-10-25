import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_ENDPOINT = "https://eecf8975-6c57-4990-969b-6a32dc2c0aff.mock.pstmn.io/hotels";

export const fetchTours = createAsyncThunk(
    "tourGrid/fetchTours", async (pageNumber) => {
        const response = await axios.get(`${API_ENDPOINT}?page=${pageNumber}`);
        return {
            tours: response.data,
            totalPages: response.data.totalPages
        };
    });
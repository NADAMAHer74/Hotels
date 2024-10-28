import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user_tours'; // Replace with your actual API URL

// Thunk for booking the package
export const TourDetailApi = createAsyncThunk(
  'package/bookPackage',
  async (packageData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, packageData);
      if (response.status === 204) {
        return 'Package booked successfully'; // Return a simple success message or handle it in the component
      }

      return response.data; // For non-204 responses
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }

  }
);


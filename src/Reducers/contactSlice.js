// src/features/contact/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendContactData ,fetchWorkingHours, fetchLocation, fetchPhones } from '../APIs/ContactApi';

export const submitContactForm = createAsyncThunk(
  'contact/submitContactForm',
  async (contactData) => {
    const apiData = {
      first_name: contactData.firstName,
      last_name: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message
    };
    return await sendContactData(apiData);
  }
);
  export const getWorkingHours = createAsyncThunk('contactInfo/getWorkingHours', async () => {
    return await fetchWorkingHours();
  });

  export const getLocation = createAsyncThunk('contactInfo/getLocation', async () => {
    return await fetchLocation();
  });

  export const getPhones = createAsyncThunk('contactInfo/getPhones', async () => {
    return await fetchPhones();
  });

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState: {
    workingHours: null,
    location: null,
    phones: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkingHours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWorkingHours.fulfilled, (state, action) => {
        state.workingHours = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getWorkingHours.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.location = action.payload;
      })
      .addCase(getPhones.fulfilled, (state, action) => {
        state.phones = action.payload;
      });
  },
});

export { contactInfoSlice };

export default contactSlice.reducer;

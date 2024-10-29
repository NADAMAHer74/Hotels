// src/features/contact/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendContactData } from '../APIs/ContactApi';

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

export default contactSlice.reducer;

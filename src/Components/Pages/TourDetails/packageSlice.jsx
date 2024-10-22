import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.example.com/package-details'; 

export const fetchPackageDetails = createAsyncThunk('package/fetchPackageDetails', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

const packageSlice = createSlice({
  name: 'package',
  initialState: {
    date: '',
    time: '',
    times: [], 
    adults: 1,
    kids: 0,
    children: 0,
    additionalServices: {
      guide: false,
      internet: false,
      photography: false,
    },
    serviceCosts: {}, 
    totalCost: 800,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setAdults: (state, action) => {
      state.adults = action.payload;
    },
    setKids: (state, action) => {
      state.kids = action.payload;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    },
    toggleService: (state, action) => {
      const service = action.payload;
      state.additionalServices[service] = !state.additionalServices[service];
    },
    updateTotalCost: (state) => {
      let baseCost = 800; // Assume $800 base
      const services = state.additionalServices;
      const serviceCosts = state.serviceCosts;

      if (services.guide) baseCost += serviceCosts.guide;
      if (services.internet) baseCost += serviceCosts.internet;
      if (services.photography) baseCost += serviceCosts.photography;

      state.totalCost = baseCost;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackageDetails.fulfilled, (state, action) => {
        const { times, adults, kids, children, additionalServices, serviceCosts } = action.payload;
        state.times = times; // Populate times from API
        state.adults = adults; // Set default adults value from API
        state.kids = kids; // Set default kids value from API
        state.children = children; // Set default children value from API
        state.additionalServices = additionalServices; // Set initial service states
        state.serviceCosts = serviceCosts; // Set costs for services (guide, internet, photography)
      });
  },
});

export const {
  setDate,
  setTime,
  setAdults,
  setKids,
  setChildren,
  toggleService,
  updateTotalCost,
} = packageSlice.actions;

export default packageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchPackageDetails } from "../../../APIs/TourDetailApi.js";

const packageSlice = createSlice({
  name: "package",
  initialState: {
    date: "",
    time: "",
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
      let baseCost = 800;
      const services = state.additionalServices;
      const serviceCosts = state.serviceCosts;

      if (services.guide) baseCost += serviceCosts.guide;
      if (services.internet) baseCost += serviceCosts.internet;
      if (services.photography) baseCost += serviceCosts.photography;

      state.totalCost = baseCost;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPackageDetails.fulfilled, (state, action) => {
      const {
        times,
        adults,
        kids,
        children,
        additionalServices,
        serviceCosts,
      } = action.payload;
      state.times = times;
      state.adults = adults;
      state.kids = kids;
      state.children = children;
      state.additionalServices = additionalServices;
      state.serviceCosts = serviceCosts;
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
export { fetchPackageDetails } from "../../../APIs/TourDetailApi.js";

export default packageSlice.reducer;

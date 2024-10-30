import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint

const aboutImgs = "http://localhost:1000/api/aboutusimages";
const aboutContent = "http://localhost:1000/api/aboutus";
const aboutStats = "http://localhost:1000/api/statistics";
const whatWeDoImg = "http://localhost:1000/api/whattodoimages";
const WhatWeDo = "http://localhost:1000/api/whattodo";
const aboutServices = "http://localhost:1000/api/services";
export const fetchAboutImgs = createAsyncThunk(
  "about/fetchAboutImg",
  async () => {
    const response = await axios.get(aboutImgs);
    return response.data;
  }
);

export const fetchAboutContent = createAsyncThunk(
  "about/fetchAboutContent",
  async () => {
    const response = await axios.get(aboutContent);
    return response.data;
  }
);

export const fetchAboutStats = createAsyncThunk(
  "about/fetchAboutStats",
  async () => {
    const response = await axios.get(aboutStats);
    return response.data;
  }
);

export const fetchWhatWeDoImg = createAsyncThunk(
  "about/fetchWhatWeDoImg",
  async () => {
    const response = await axios.get(whatWeDoImg);
    return response.data;
  }
);

export const fetchWhatWeDo = createAsyncThunk(
  "about/fetchWhatWeDo",
  async () => {
    const response = await axios.get(WhatWeDo);
    return response.data;
  }
);

export const fetchAboutServices = createAsyncThunk(
  "about/fetchAboutServices",
  async () => {
    const response = await axios.get(aboutServices);
    return response.data;
  }
);

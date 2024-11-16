import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "./Url";

const aboutImgs = `${BaseUrl}/aboutusimages`;
const aboutContent = `${BaseUrl}/aboutus`;
const aboutStats = `${BaseUrl}/statistics`;
const whatWeDoImg = `${BaseUrl}/whattodoimages`;
const WhatWeDo = `${BaseUrl}/whattodo`;
const aboutServices = `${BaseUrl}/services`;
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

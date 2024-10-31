import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const homebanner_url = "http://localhost:1000/api/imagebanners";
const destination_url = "http://localhost:1000/api/top-destinations";
const about_url = "http://localhost:1000/api/aboutusimages";
const aboutContent_url = "http://localhost:1000/api/aboutus";
const tour_url = "http://localhost:1000/api/latestTours";
const blog_url = "http://localhost:1000/api/latest";
export const fetchBannerHome = createAsyncThunk("banner/fetchBannerHome", async () => {
  try {
    const response = await axios.get(homebanner_url);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const fetchDestination = createAsyncThunk(
  "distination/fetchDestination",
  async () => {
    const response = await axios.get(destination_url);
    return response.data;
  }
);
export const fetchAbout = createAsyncThunk("about/fetchAbout", async () => {
  const response = await axios.get(about_url);
  return response.data;
});
export const fetchAboutContent = createAsyncThunk(
  "about/fetchAboutContent",
  async () => {
    const response = await axios.get(aboutContent_url);
    return response.data;
  }
);
export const fetchTour = createAsyncThunk("tour/fetchTour", async () => {
  const response = await axios.get(tour_url);
  return response.data;
});

export const fetchBlog = createAsyncThunk("blog/fetchBlog", async () => {
  const response = await axios.get(blog_url);
  return response.data;
});


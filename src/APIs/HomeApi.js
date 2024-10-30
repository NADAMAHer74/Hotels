import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const banner_url = "http://localhost:1000/api/banners";
const destination_url = "http://localhost:1000/api/top-destinations";
const about_url = "http://localhost:1000/api/aboutusimages";
const tour_url = "http://localhost:1000/api/latestTours";
const blog_url = "http://localhost:1000/api/latest";
export const fetchBanner = createAsyncThunk("banner/fetchBanner", async () => {
  const response = await axios.get(banner_url);
  return response.data;
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
export const fetchTour = createAsyncThunk("tour/fetchTour", async () => {
  const response = await axios.get(tour_url);
  return response.data;
});

export const fetchBlog = createAsyncThunk("blog/fetchBlog", async () => {
  const response = await axios.get(blog_url);
  return response.data;
});

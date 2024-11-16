import axios from "axios";
import BaseUrl from "./Url";

export const sendContactData = async (contactData) => {
  try {
    const response = await axios.post(`${BaseUrl}/contactus`, contactData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to send contact data"
    );
  }
};

export const fetchWorkingHours = async () => {
  const response = await axios.get(`${BaseUrl}/workinghours`);
  return response.data;
};

export const fetchLocation = async () => {
  const response = await axios.get(`${BaseUrl}/locations`);
  return response.data;
};

export const fetchPhones = async () => {
  const response = await axios.get(`${BaseUrl}/phones`);
  return response.data;
};

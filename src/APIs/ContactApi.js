import axios from "axios";

export const sendContactData = async (contactData) => {
  try {
    const response = await axios.post(
      "http://localhost:1000/api/contactus",
      contactData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to send contact data"
    );
  }
};

import axios from "axios";

export const sendContactData = async (contactData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/contactus",
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

  export const fetchWorkingHours = async () => {
    const response = await axios.get("http://localhost:5000/api/workingHours");
    return response.data;
  };

  export const fetchLocation = async () => {
    const response = await axios.get("http://localhost:5000/api/location");
    return response.data;
  };

  export const fetchPhones = async () => {
    const response = await axios.get("http://localhost:5000/api/phones");
    return response.data;
  };

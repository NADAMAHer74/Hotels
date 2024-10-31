import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitContactForm,
  getWorkingHours,
  getLocation,
  getPhones,
} from "../../../Reducers/contactSlice";
import MainBanner from "../MainBanner/MainBanner";
import "leaflet/dist/leaflet.css";
import "./Contact.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const dispatch = useDispatch();

  // Accessing the Redux state
  const { workingHours, location, phones, loading, error } = useSelector((state) => state.contactInfo);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getWorkingHours());
        await dispatch(getLocation());
        await dispatch(getPhones());
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Contact Information</h1>

      <h2>Working Hours</h2>
      {workingHours && workingHours.visible ? (
        <p>
          {workingHours.start_day} - {workingHours.end_day}:{" "}
          {workingHours.start_hour} - {workingHours.end_hour}
        </p>
      ) : (
        <p>Working hours not available</p>
      )}

      <h2>Location</h2>
      {location && location.visible ? (
        <p>{location.location}</p>
      ) : (
        <p>Location not available</p>
      )}

      <h2>Phone Numbers</h2>
      {phones && phones.length > 0 ? (
        phones.filter((phone) => phone.visible).map((phone, index) => (
          <p key={index}>{phone.phone_number}</p>
        ))
      ) : (
        <p>No phone numbers available</p>
      )}
    </div>
  );
};

export default Contact;

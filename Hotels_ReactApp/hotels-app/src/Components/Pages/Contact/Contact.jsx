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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.contact.status);
  const workingHours = useSelector((state) => state.contactInfo.workingHours);
  const location = useSelector((state) => state.contactInfo.location);
  const phones = useSelector((state) => state.contactInfo.phones);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(getWorkingHours());
    dispatch(getLocation());
    dispatch(getPhones());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields and phone length
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.length < 11) {
      errors.phone = "Phone number must be at least 11 digits";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    dispatch(submitContactForm(formData))
      .then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          toast.success("Message sent successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        } else if (action.meta.requestStatus === "rejected") {
          toast.error("Failed to send message. Please try again.");
        }
      })
      .catch(() => {
        toast.error("An error occurred. Please try again later.");
      });
  };

  return (
    <>
      <MainBanner title="Contact us" />
      <div className="contact-page container">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="container row">
          <form className="col-md-6 col-sm-12" onSubmit={handleSubmit}>
            <div className="input-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {formErrors.firstName && (
                <p className="error">{formErrors.firstName}</p>
              )}
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && (
                <p className="error">{formErrors.lastName}</p>
              )}
            </div>
            <div className="input-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {formErrors.phone && <p className="error">{formErrors.phone}</p>}
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="subject-input"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Write A Message..."
              className="message-input"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="submit-btn">
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Info Section */}
          <div className="col-md-6 col-sm-12">
            <div className="contactInfoForm">
              <div className="d-flex align-items-center">
                <i className="fas fa-clock icon"></i>
                <div>
                  <h4>Hours:</h4>

                  {workingHours && workingHours.length > 0 ? (
                    <p>
                      {workingHours[0].start_day} - {workingHours[0].end_day}:{" "}
                      {workingHours[0].start_hour} - {workingHours[0].end_hour}
                    </p>
                  ) : (
                    <p>Loading hours...</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center">
                <i className="fas fa-phone-alt phoneIcon icon"></i>
                <div>
                  <h4>Call Us:</h4>
                  <p>
                    {phones.length > 0
                      ? phones.map((phone, index) => (
                          <span key={index}>
                            {phone.phone_number}
                            <br />
                          </span>
                        ))
                      : "Loading..."}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center">
                <i className="fas fa-map-marker-alt mapIcon icon"></i>
                <div>
                  <h4>Location:</h4>
                  <p>
                    {" "}
                    {location.map((loc) => (
                      <div key={loc.location_id}>
                        <p> {loc.location}</p>
                        {/* <p>Visible: {loc.visible ? "Yes" : "No"}</p> */}
                      </div>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.696922906035!2d-74.00797828459493!3d40.71277597933064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168ae2b73%3A0xf6b8fe3c0c4b3a5c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1603927603773!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen={true}
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;

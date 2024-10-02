import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaClock, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons
import "leaflet/dist/leaflet.css";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Form Section */}
      <div className="form-section">
        <form className="contact-form">
          <div className="input-row">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="input-row">
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone" />
          </div>
          <input type="text" placeholder="Subject" className="subject-input" />
          <textarea placeholder="Write A Message..." className="message-input"></textarea>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-box">
            <h4><FaClock /> Hours:</h4>
            <p>Monday - Friday: 8 AM - 5:30 PM</p>
            <p>Saturday - Sunday: Closed</p>
            <h4><FaPhone /> Call:</h4>
            <p>+1-040-981-3287</p>
            <p>+1-608-850-3300</p>
            <h4><FaMapMarkerAlt /> Location:</h4>
            <p>240 Carlotte Estbethville, North Carolina(NC), 25997</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.696922906035!2d-74.00797828459493!3d40.71277597933064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168ae2b73%3A0xf6b8fe3c0c4b3a5c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1603927603773!5m2!1sen!2sin"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;

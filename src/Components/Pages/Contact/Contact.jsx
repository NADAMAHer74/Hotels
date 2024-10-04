import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaClock, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Importing correct icons
import "leaflet/dist/leaflet.css";
import "./Contact.css"; // Import CSS for styles

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
            <h4 className="icon fas fa-clock"> Hours:</h4>
            <p>Monday - Friday: 8 AM - 5:30 PM</p>
            <p>Saturday - Sunday: Closed</p>
            <h4><FaPhone className="icon" /> Call:</h4>
            <p>+1-040-981-3287</p>
            <p>+1-608-850-3300</p>
            <h4><FaMapMarkerAlt className="icon" /> Location:</h4>
            <p>240 Carlotte Estbethville, North Carolina(NC), 25997</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <MapContainer center={[40.7128, -74.0060]} zoom={12} style={{ height: "300px", width: "100%", margin: "20px auto" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[40.7128, -74.0060]}>
            <Popup>New York Office</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Contact;

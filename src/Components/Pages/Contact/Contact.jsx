import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaClock, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Importing correct icons
import MainBanner from "../MainBanner/MainBanner";
import "leaflet/dist/leaflet.css";
import "./Contact.css"; // Import CSS for styles

const Contact = () => {
  return (
    <>
    <MainBanner title="Contact us" />
    <div className="contact-page container">
      {/* Form Section */}
      <div className=" container row">
        <form className=" col-md-6 col-sm-12">
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
        <div className="col-md-6 col-sm-12">
          <div className="contactInfoForm">
            <div className="d-flex align-items-center">
              <i className="fas fa-clock icon"></i>
              <div>
                <a>
                  <h4>Hours:</h4>
                </a>
                <p>
                  Monday - Friday: 8 AM - 5:30 PM<br />Saturday - Sunday: Closed
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <i className="fas fa-phone-alt phoneIcon icon"></i>
              <div>
                <a>
                  <h4>Call Us:</h4>
                </a>
                <p>(+000) 987-3267<br />+88 568 956 238</p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <i className="fas fa-map-marker-alt mapIcon icon"></i>
              <div>
                <a>
                  <h4>Location:</h4>
                </a>
                <p>242 Carlyle Rd Zebulon, North Carolina (NC), 27597</p>
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



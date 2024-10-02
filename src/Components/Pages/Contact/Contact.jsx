import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css";

const ContactUs = () => {
  return (
    <div className="container contactForm">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6 col-sm-12">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6 col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name:"
                />
              </div>
              <div className="form-group col-md-6 col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name:"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 col-sm-12">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email:"
                />
              </div>
              <div className="form-group col-md-6 col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone:"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Subject:"
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Write a Message..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success mb-2">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="col-md-6 col-sm-12">
          <div className="contactInfoForm">
            <div className="d-flex align-items-center">
              <i className="fas fa-clock"></i>
              <div>
                <a href="#">
                  <h4>Hours:</h4>
                </a>
                <p>
                  Monday - Friday: 8 AM - 5:30 PM
                  <br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <i className="fas fa-phone-alt"></i>
              <div>
                <a href="#">
                  <h4>Call Us:</h4>
                </a>
                <p>
                  (+000) 987-3267
                  <br />
                  +88 568 956 238
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <a href="#">
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
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { FaClock, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; 
// import MainBanner from "../MainBanner/MainBanner";
// import "leaflet/dist/leaflet.css";
// import "./Contact.css"; 

// const Contact = () => {
//   return (
//     <>
//       <MainBanner title="Contact us" />
//       <div className="contact-page container">
//         <div className=" container row">
//           <form className=" col-md-6 col-sm-12">
//             <div className="input-row">
//               <input type="text" placeholder="First Name" />
//               <input type="text" placeholder="Last Name" />
//             </div>
//             <div className="input-row">
//               <input type="email" placeholder="Email" />
//               <input type="tel" placeholder="Phone" />
//             </div>
//             <input type="text" placeholder="Subject" className="subject-input" />
//             <textarea placeholder="Write A Message..." className="message-input"></textarea>
//             <button type="submit" className="submit-btn">Send Message</button>
//           </form>
//           <div className="col-md-6 col-sm-12">
//             <div className="contactInfoForm">
//               <div className="d-flex align-items-center">
//                 <i className="fas fa-clock icon"></i>
//                 <div>
//                   <a>
//                     <h4>Hours:</h4>
//                   </a>
//                   <p>
//                     Monday - Friday: 8 AM - 5:30 PM<br />Saturday - Sunday: Closed
//                   </p>
//                 </div>
//               </div>
//               <hr />
//               <div className="d-flex align-items-center">
//                 <i className="fas fa-phone-alt phoneIcon icon"></i>
//                 <div>
//                   <a>
//                     <h4>Call Us:</h4>
//                   </a>
//                   <p>(+000) 987-3267<br />+88 568 956 238</p>
//                 </div>
//               </div>
//               <hr />
//               <div className="d-flex align-items-center">
//                 <i className="fas fa-map-marker-alt mapIcon icon"></i>
//                 <div>
//                   <a>
//                     <h4>Location:</h4>
//                   </a>
//                   <p>242 Carlyle Rd Zebulon, North Carolina (NC), 27597</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="map">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.696922906035!2d-74.00797828459493!3d40.71277597933064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168ae2b73%3A0xf6b8fe3c0c4b3a5c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1603927603773!5m2!1sen!2sin"
//             width="100%"
//             height="450"
//             allowFullScreen={true}
//             aria-hidden="false"
//             tabIndex="0"
//           ></iframe>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contact;



// src/components/Contact.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm, getWorkingHours, getLocation, getPhones } from "../../../Reducers/contactSlice";
import MainBanner from "../MainBanner/MainBanner";
import "leaflet/dist/leaflet.css";
import "./Contact.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {
  const dispatch = useDispatch();
  // const { workingHours, location, phones, status} = useSelector((state) => state.contact.status);
  const { status: contactStatus } = useSelector((state) => state.contact);
  const { workingHours, location, phones, status: contactInfoStatus } = useSelector((state) => state.contactInfo);
  


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          toast.success("Message sent successfully!");
        } else if (action.meta.requestStatus === 'rejected') {
          toast.error("Failed to send message. Please try again.");
        }
      })
      .catch(() => {
        toast.error("An error occurred. Please try again later.");
      });
  };

  useEffect(() => {
    dispatch(getWorkingHours());
    dispatch(getLocation());
    dispatch(getPhones());
  }, [dispatch]);


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
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
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
              {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
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
                   {workingHours && workingHours.visible ? (
                  <p>{workingHours.start_day} -{workingHours.end_day}: {workingHours.start_hour} - {workingHours.end_hour}</p>
                ) : (
                  <p>Working hours not available</p>
                )}
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
                   {/* {phones && phones.length > 0 &&
                    phones.filter(phone => phone.visible).map((phone, index) => (
                  <p key={index}>{phone.phone_number}</p>
                  ))} */}
                  {phones?.filter(phone => phone.visible).map((phone, index) => (
                  <p key={index}>{phone.phone_number}</p>
                ))}
                 </div>
               </div>
               <hr />
               <div className="d-flex align-items-center">
                 <i className="fas fa-map-marker-alt mapIcon icon"></i>
                 <div>
                   <a>
                     <h4>Location:</h4>
                   </a>
                   {location && location.visible ? (
                   <p>{location.location}</p>
                  ) : (
                    <p>Location not available</p>
                  )}
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



// import React from 'react'
// import "./TourDetailcss.css";

// function BookPackage() {
//   return (
//     <div>
//             <div className="package-section">
//               <h3 className="section-title">Package Details</h3>
//               <form className="package-form">
//                 <label className="date" for="date">
//                   Date
//                 </label>
//                 <div className="input-group">
//                   <input type="date" id="date" name="date" />
//                   <span className="icon-calendar"></span>
//                 </div>

//                 <label className="time" for="time">
//                   Time
//                 </label>
//                 <select id="time" name="time">
//                   <option value="default">Default sorting</option>
//                 </select>

//                 <div className="tickets">
//                   <div className="ticket-type">
//                     <label for="adults">Adults (18+ years)</label>
//                     <div className="counter">
//                       <button type="button" className="minus">
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         id="adults"
//                         name="adults"
//                         min="1"
//                         value="1"
//                       />
//                       <button type="button" className="plus">
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="ticket-type">
//                     <label for="kids">Kids (13 years)</label>
//                     <div className="counter">
//                       <button type="button" className="minus">
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         id="kids"
//                         name="kids"
//                         min="0"
//                         value="1"
//                       />
//                       <button type="button" className="plus">
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <div className="ticket-type">
//                     <label for="children">Children (5+ years)</label>
//                     <div className="counter">
//                       <button type="button" className="minus">
//                         -
//                       </button>
//                       <input
//                         type="number"
//                         id="children"
//                         name="children"
//                         min="0"
//                         value="1"
//                       />
//                       <button type="button" className="plus">
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="additional-services">
//                   <label>Additional Service</label>
//                   <div className="service-item">
//                     <input type="checkbox" id="guide" name="guide" />
//                     <label for="guide">Additional Guide</label>
//                     <span>$420</span>
//                   </div>
//                   <div className="service-item">
//                     <input type="checkbox" id="internet" name="internet" />
//                     <label for="internet">Internet</label>
//                     <span>$420</span>
//                   </div>
//                   <div className="service-item">
//                     <input
//                       type="checkbox"
//                       id="photography"
//                       name="photography"
//                     />
//                     <label for="photography">Photography</label>
//                     <span>$420</span>
//                   </div>
//                 </div>

//                 <p className="total-cost">
//                   Total Cost: <span className="price">$800.00</span> / per
//                   person
//                 </p>
//                 <button type="submit" className="book-btn">
//                   Proceed To Book
//                 </button>
//               </form>
//             </div>
//             <div className="tour-info mt-5">
//               <h3>Tour Information</h3>
//               <ul>
//                 <li>
//                   <span className="icon">
//                     <i className="fa-solid fa-user-group"></i>
//                   </span>{" "}
//                   Max Guests: Date
//                 </li>
//                 <li>
//                   <span className="icon">
//                     <i className="fa-solid fa-user-group"></i>
//                   </span>{" "}
//                   Min Age: 12+
//                 </li>
//                 <li>
//                   <span className="icon">
//                     <i className="fa-solid fa-plane"></i>
//                   </span>{" "}
//                   Tour Location: America
//                 </li>
//                 <li>
//                   <span className="icon">
//                     <i className="fa-solid fa-earth-americas"></i>
//                   </span>{" "}
//                   Languages Support: Global
//                 </li>
//               </ul>
//           </div>
//     </div>
//   )
// }

// export default BookPackage





import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDate,
  setTime,
  setAdults,
  setKids,
  setChildren,
  toggleService,
  updateTotalCost,
  fetchPackageDetails, // Action to fetch data from API
} from './packageSlice'; // Import your Redux slice

import "./TourDetailcss.css";

function BookPackage() {
  const dispatch = useDispatch();

  // Access state from Redux
  const { date, time, times, adults, kids, children, additionalServices, totalCost, serviceCosts } = useSelector(
    (state) => state.package
  );

  // Fetch data from API when component mounts
  useEffect(() => {
    dispatch(fetchPackageDetails());
  }, [dispatch]);

  // Handle toggling of additional services and updating total cost
  const handleServiceChange = (service) => {
    dispatch(toggleService(service));
    dispatch(updateTotalCost());
  };

  return (
    <div>
      <div className="package-section">
        <h3 className="section-title">Package Details</h3>
        <form className="package-form">
          <label className="date" htmlFor="date">Date</label>
          <div className="input-group">
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => dispatch(setDate(e.target.value))}
            />
            <span className="icon-calendar"></span>
          </div>

          <label className="time" htmlFor="time">Time</label>
          <select
            id="time"
            name="time"
            value={time}
            onChange={(e) => dispatch(setTime(e.target.value))}
          >
            {times.map((timeOption, index) => (
              <option key={index} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>

          <div className="tickets">
            <div className="ticket-type">
              <label htmlFor="adults">Adults (18+ years)</label>
              <div className="counter">
                <button type="button" className="minus">-</button>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  min="1"
                  value={adults}
                  onChange={(e) => dispatch(setAdults(e.target.value))}
                />
                <button type="button" className="plus">+</button>
              </div>
            </div>

            <div className="ticket-type">
              <label htmlFor="kids">Kids (13 years)</label>
              <div className="counter">
                <button type="button" className="minus">-</button>
                <input
                  type="number"
                  id="kids"
                  name="kids"
                  min="0"
                  value={kids}
                  onChange={(e) => dispatch(setKids(e.target.value))}
                />
                <button type="button" className="plus">+</button>
              </div>
            </div>

            <div className="ticket-type">
              <label htmlFor="children">Children (5+ years)</label>
              <div className="counter">
                <button type="button" className="minus">-</button>
                <input
                  type="number"
                  id="children"
                  name="children"
                  min="0"
                  value={children}
                  onChange={(e) => dispatch(setChildren(e.target.value))}
                />
                <button type="button" className="plus">+</button>
              </div>
            </div>
          </div>

          <div className="additional-services">
            <label>Additional Service</label>
            <div className="service-item">
              <input
                type="checkbox"
                id="guide"
                name="guide"
                checked={additionalServices.guide}
                onChange={() => handleServiceChange('guide')}
              />
              <label htmlFor="guide">Additional Guide</label>
              <span>${serviceCosts.guide}</span>
            </div>

            <div className="service-item">
              <input
                type="checkbox"
                id="internet"
                name="internet"
                checked={additionalServices.internet}
                onChange={() => handleServiceChange('internet')}
              />
              <label htmlFor="internet">Internet</label>
              <span>${serviceCosts.internet}</span>
            </div>

            <div className="service-item">
              <input
                type="checkbox"
                id="photography"
                name="photography"
                checked={additionalServices.photography}
                onChange={() => handleServiceChange('photography')}
              />
              <label htmlFor="photography">Photography</label>
              <span>${serviceCosts.photography}</span>
            </div>
          </div>

          <p className="total-cost">
            Total Cost: <span className="price">${totalCost}</span> / per person
          </p>
          <button type="submit" className="book-btn">
            Proceed To Book
          </button>
        </form>
      </div>

      <div className="tour-info mt-5">
        <h3>Tour Information</h3>
        <ul>
          <li>
            <span className="icon">
              <i className="fa-solid fa-user-group"></i>
            </span>{" "}
            Max Guests: Date
          </li>
          <li>
            <span className="icon">
              <i className="fa-solid fa-user-group"></i>
            </span>{" "}
            Min Age: 12+
          </li>
          <li>
            <span className="icon">
              <i className="fa-solid fa-plane"></i>
            </span>{" "}
            Tour Location: America
          </li>
          <li>
            <span className="icon">
              <i className="fa-solid fa-earth-americas"></i>
            </span>{" "}
            Languages Support: Global
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BookPackage;

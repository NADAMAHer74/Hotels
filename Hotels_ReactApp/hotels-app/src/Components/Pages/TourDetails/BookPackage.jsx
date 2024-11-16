import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  incrementadult_quantity,
  decrementadult_quantity,
  incrementkids_quantity,
  decrementkids_quantity,
  incrementchild_quantity,
  decrementchild_quantity,
  toggleAdditionalService,
  calculateTotalCost,
  setPrices,
  name,
  languagesSupport,
  maxGusts,
  miniAge,
  location,
  resetBookingState,
} from "../../../Reducers/packageSlice";
import { TourDetailApi } from "../../../APIs/TourDetailApi"; // Import the thunk from API file
import "./TourDetailcss.css";

const BookPackage = ({
  tourId,
  adultPrice,
  kidsPrice,
  childrenPrice,
  name,
  languagesSupport,
  maxGusts,
  miniAge,
  location,
}) => {
  const dispatch = useDispatch();
  const {
    adult_quantity,
    kids_quantity,
    child_quantity,
    additional_service_ids,
    totalCost,
    status,
    error,
  } = useSelector((state) => state.package);
  // const handleBookPackage = (e) => {
  //   e.preventDefault();
  //   const packageData = {
  //     tourId,
  //     adult_quantity,
  //     kids_quantity,
  //     child_quantity,
  //     additional_service_ids,
  //   };
  //   dispatch(TourDetailApi(packageData))
  //     .then((action) => {
  //       if (action.meta.requestStatus === "fulfilled") {
  //         toast.success("Booked successfully");
  //         dispatch(resetBookingState());
  //       } else if (action.meta.requestStatus === "rejected") {
  //         toast.error("Booking failed. Please try again.");
  //       }
  //     })
  //     .catch(() => {
  //       toast.error("An error occurred. Please try again later.");
  //     });
  // };
  const handleBookPackage = (e) => {
    e.preventDefault();

    // Prepare the package data with quantities and selected additional services
    const packageData = {
      tourId,
      adult_quantity,
      kids_quantity,
      child_quantity,
      additional_service_ids, // Ensure this is the array of selected services
    };

    // Proceed with the booking process by dispatching the API action
    dispatch(TourDetailApi(packageData))
      .then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // If booking is successful, show success message
          toast.success("Booked successfully!");

          dispatch(resetBookingState());
        } else if (action.meta.requestStatus === "rejected") {
          // If booking fails, show error message
          toast.error("Booking failed. Please try again.");
        }
      })
      .catch(() => {
        // Catch any errors during the booking process and show an error message
        toast.error("An error occurred. Please try again later.");
      });
  };

  useEffect(() => {
    dispatch(setPrices({ adultPrice, kidsPrice, childrenPrice }));
  }, [dispatch, adultPrice, kidsPrice, childrenPrice]);

  useEffect(() => {
    dispatch(setPrices({ adultPrice, kidsPrice, childrenPrice })); // Set prices in the slice
  }, [
    adultPrice,
    kidsPrice,
    childrenPrice,
    name,
    languagesSupport,
    maxGusts,
    miniAge,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(calculateTotalCost()); // Calculate total cost
  }, [
    adult_quantity,
    kids_quantity,
    child_quantity,
    additional_service_ids,
    dispatch,
  ]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="package-section">
        <h3 className="section-title">Package Details</h3>
        <form className="package-form" onSubmit={handleBookPackage}>
          <label htmlFor="date" style={{ fontWeight: "bold" }}>
            Date
          </label>
          <div className="input-group">
            <input type="date" id="date" name="date" />
            <span className="icon-calendar"></span>
          </div>

          <label htmlFor="time" style={{ fontWeight: "bold" }}>
            Time
          </label>
          <select id="time" name="time">
            <option value="default">Default sorting</option>
            {/* Add more time options as necessary */}
          </select>

          <div className="tickets">
            <div className="ticket-type">
              <label>
                Adults (18+ years) <span className="me-2">${adultPrice}</span>
              </label>
              <div className="counter">
                <button
                  type="button"
                  onClick={() => dispatch(decrementadult_quantity())}
                >
                  -
                </button>
                <span>{adult_quantity}</span>
                <button
                  type="button"
                  onClick={() => dispatch(incrementadult_quantity())}
                >
                  +
                </button>
              </div>
            </div>

            <div className="ticket-type">
              <label>
                Kids (13 years) <span className="me-2">${kidsPrice}</span>
              </label>
              <div className="counter">
                <button
                  type="button"
                  onClick={() => dispatch(decrementkids_quantity())}
                >
                  -
                </button>
                <span>{kids_quantity}</span>
                <button
                  type="button"
                  onClick={() => dispatch(incrementkids_quantity())}
                >
                  +
                </button>
              </div>
            </div>

            <div className="ticket-type">
              <label>
                Children (5+ years){" "}
                <span className="me-2">${childrenPrice}</span>
              </label>
              <div className="counter">
                <button
                  type="button"
                  onClick={() => dispatch(decrementchild_quantity())}
                >
                  -
                </button>
                <span>{child_quantity}</span>
                <button
                  type="button"
                  onClick={() => dispatch(incrementchild_quantity())}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="additional-services">
            <label>Additional Service</label>
            <div className="service-item">
              <input
                className="inputCheck"
                type="checkbox"
                checked={additional_service_ids.includes(1)}
                onChange={() => dispatch(toggleAdditionalService(1))}
              />
              <label>Additional Guide</label>
              <span>$420</span>
            </div>
            <div className="service-item">
              <input
                className="inputCheck"
                type="checkbox"
                checked={additional_service_ids.includes(2)}
                onChange={() => dispatch(toggleAdditionalService(2))}
              />
              <label>Internet</label>
              <span>$420</span>
            </div>
            <div className="service-item">
              <input
                className="inputCheck"
                type="checkbox"
                checked={additional_service_ids.includes(3)}
                onChange={() => dispatch(toggleAdditionalService(3))}
              />
              <label>Photography</label>
              <span>$420</span>
            </div>
          </div>

          <p className="total-cost">
            Total Cost: <span className="price">${totalCost}</span> / per person
          </p>
          <button
            type="submit"
            className="book-btn"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Booking..." : "Proceed To Book"}
          </button>
        </form>
      </div>

      {/* Tour Information Section */}
      <div className="tour-info mt-5">
        <h3>Tour Information</h3>
        <ul>
          <li>
            <span className="icon">
              <i
                className="fa-solid fa-user-group"
                style={{ color: "#11BB67" }}
              ></i>
            </span>{" "}
            Max Guests: {maxGusts}
          </li>
          <li>
            <span className="icon">
              <i
                className="fa-solid fa-user-group"
                style={{ color: "#11BB67" }}
              ></i>
            </span>{" "}
            Min Age: {miniAge}
          </li>
          <li>
            <span className="icon">
              <i className="fa-solid fa-plane" style={{ color: "#11BB67" }}></i>
            </span>{" "}
            Tour Location: {location}
          </li>
          <li>
            <span className="icon">
              <i
                className="fa-solid fa-earth-americas"
                style={{ color: "#11BB67" }}
              ></i>
            </span>{" "}
            Languages Support: {languagesSupport}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookPackage;

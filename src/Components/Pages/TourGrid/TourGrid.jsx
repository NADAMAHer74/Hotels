import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours } from "../../../APIs/TourGridApi"; // Update path as needed
import { Link } from "react-router-dom";
import './style.css'; // Make sure to create this CSS file for styling

const CardComponent = ({ imgSrc, location, name, adultPrice, tourId }) => (
  <Link to={`/tourdetail/${tourId}`} style={{ textDecoration: "none" }}>
    <div className="tourCard">
      <img className="cardImgTop" src={imgSrc} alt={name} />
      <div className="cardOverlay">
        <div className="cardDetails">
          <div className="address">
            <p className="textofCard">
              <i className="fa-solid fa-location-dot" style={{ color: "#0ced63" }}></i> {location}
            </p>
            <h5 className="cardTitle">{name}</h5>
          </div>
          <div className="newPrice">
            <i className="fa-solid fa-dollar-sign" style={{ color: "#0ced63" }}></i> {adultPrice}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const TourGrid = () => {
  const dispatch = useDispatch();
  const { tours, loading, error } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(fetchTours(tours)); // Fetch page 1 on load
  }, [dispatch]);

  return (
    <div className="tourGrid">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {tours && tours.length > 0 ? (
        tours.map((tour, index) => (
          <CardComponent
            key={index}
            imgSrc={tour.tourImage}
            location={tour.location}
            name={tour.name}
            adultPrice={tour.adultPrice}
            tourId={tour.id} // Assuming tour has an id field
          />
        ))
      ) : (
        <p>No tours found.</p>
      )}
    </div>
  );
};

export default TourGrid;


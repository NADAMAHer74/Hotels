import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours } from "../../../APIs/TourGridApi";
import { Link } from "react-router-dom";
import "./style.css";
import Pagination from "../../Shared/Pagination/Pagination";
import MainBanner from "../MainBanner/MainBanner";

const TourGrid = () => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.toursData.tours);
  const { currentPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(fetchTours(currentPage));
  }, [currentPage, dispatch]);

  return (
    <>
      <MainBanner title="Tour Grid" />
      <div className="container my-5">
        <div className="row">
          {tours && tours.length > 0 ? (
            <div className="tourGrid mt-5">
              {tours.map((tour) => (
                <Link
                  key={tour.tour_id}
                  to={{
                    pathname: `/tourdetail/${tour.tour_id}`,
                    state: {
                      tourImage: tour.tourImage,
                      adultPrice: tour.adultPrice,
                      kidsPrice: tour.kidsPrice,
                      childrenPrice: tour.childrenPrice,
                      location: tour.location,
                      name: tour.name,
                      languagesSupport: tour.languagesSupport,
                      maxGusts: tour.maxGusts,
                      miniAge: tour.miniAge,
                    },
                  }}
                  className="tourLink "
                >
                  <div
                    key={tour.tour_id}
                    className="card tourCard col-lg-4 col-md-6 col-sm-12 mb-4"
                  >
                    <img
                      className="cardImgTop"
                      src={`http://localhost:1000/${tour.tourImage}`}
                      alt={tour.name}
                    />
                    <div className="cardOverlay">
                      <div className="d-flex">
                        <span className="discountBadge">10% off</span>
                        <span className="featuredBadge">Featured</span>
                      </div>
                      <div className="address">
                        <p className="textOfCard">
                          <i
                            className="fa-solid fa-location-dot"
                            style={{ color: "#0ced63" }}
                          ></i>{" "}
                          {tour.location}
                        </p>
                        <h5 className="cardTitle">{tour.name}</h5>
                      </div>
                      <div className="priceContainer">
                        <span className="newPrice">${tour.adultPrice}</span>
                        <span className="price">${tour.adultPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No tours found.</p>
          )}
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default TourGrid;

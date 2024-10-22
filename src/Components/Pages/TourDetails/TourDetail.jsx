import React from "react";
import "./TourDetailcss.css";
import discovery from "../../../images/discover-1.jpg";
import MainBanner from "../../../Components/Pages/MainBanner/MainBanner";
import BookPackage from "./BookPackage";

function TourDetail() {
  return (
    <div>
      <MainBanner title="Discovery Island Kayak Tour" />
      <div className="container">
        <div className="row page-body">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="tour-header">
              <div className="location-review">
                <p className="location">
                  <span className="icon-location">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>{" "}
                  Traford Park Lexington, 40507
                </p>
                <p className="review">
                  <span className="icon-star">
                    <i className="fa-solid fa-star"></i>
                  </span>{" "}
                  4.5 (1.5k review)
                </p>
              </div>

              <h1 className="tour-title">Discovery Island Kayak..</h1>

              <div className="tour-details">
                <p className="detail-item">
                  <span className="icon-price">
                    <i className="fa-solid fa-dollar-sign"></i>
                  </span>{" "}
                  From <strong>$116.10</strong>
                </p>
                <p className="detail-item">
                  <span className="icon-duration">
                    <i className="fa-solid fa-clock-rotate-left"></i>
                  </span>{" "}
                  Duration <strong>3 days</strong>
                </p>
                <p className="detail-item">
                  <span className="icon-type">
                    <i className="fa-solid fa-tower-broadcast"></i>
                  </span>{" "}
                  Tour Type <strong>3 days</strong>
                </p>
              </div>
            </div>

            <div className="second-section">
              <img src={discovery} alt="" className="discover-image" />
              <div className="text-image mt-5">
                <h3>Tour Overview</h3>
                <p className="mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  At volutpat diam ut venenatis tellus in metus. Sem et tortor
                  consequat id porta. Et malesuada fames ac turpis egestas sed.
                  Condimentum vitae sapien pellentesque habitant morbi tristique
                  senectus et. Cras semper auctor neque vitae. Turpis in eu mi
                  bibendum neque. Pellentesque habitant morbi tristique senectus
                  et netus. Ut morbi tincidunt augue interdum velit euismod. At
                  in tellus integer feugiat scelerisque varius morbi. Ultrices
                  neque ornare aenean euismod. Imperdiet proin fermentum leo
                </p>
              </div>
            </div>

            <section className="tour-section">
              <div className="tour-amenities">
                <h2>Tour Amenities</h2>
                <div className="amenities-list">
                  <span>
                    <i className="fa-solid fa-star"> </i> 4.9 Accommodation
                  </span>
                  <span>
                    <span>
                      <i className="fa-solid fa-plane "></i>
                    </span>{" "}
                    4.9 Airport
                  </span>
                  <span>
                    {" "}
                    <span>
                      <i className="fa-solid fa-wifi "></i>
                    </span>{" "}
                    Wi-Fi
                  </span>
                  <span>
                    {" "}
                    <span>
                      <i className="fa-solid fa-utensils "></i>
                    </span>{" "}
                    4.9 Dinner & Snacks
                  </span>
                  <span>
                    <span>
                      <i className="fa-solid fa-gears"></i>
                    </span>{" "}
                    Additional Services
                  </span>
                  <span>
                    <span>
                      <i className="fa-solid fa-suitcase "></i>
                    </span>{" "}
                    Insurance
                  </span>
                  <span>
                    <span>
                      <i className="fa-solid fa-bus "></i>
                    </span>{" "}
                    Transport
                  </span>
                </div>
              </div>

              <div className="location">
                <h2>Location</h2>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9351826319173!2d-74.01312968425604!3d40.71277567933024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a19d8b09e5f%3A0xd7f7bbcc5a237b3b!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2seg!4v1694194120807!5m2!1sen!2seg"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div className="pagination">
                <ul>
                  <li>
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a href="#">3</a>
                  </li>
                  <li>
                    <a href="#" className="next">
                      →
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="col-lg-4 col-md-10 col-sm-12">
              <BookPackage/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;


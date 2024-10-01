import React from "react";
import "./TourDetailcss.css";
import discovery from "../../../images/discover-1.jpg";
import MainBanner from "../../../Components/Pages/MainBanner/MainBanner";

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
            <div className="package-section">
              <h3 className="section-title">Package Details</h3>
              <form className="package-form">
                <label className="date" for="date">
                  Date
                </label>
                <div className="input-group">
                  <input type="date" id="date" name="date" />
                  <span className="icon-calendar"></span>
                </div>

                <label className="time" for="time">
                  Time
                </label>
                <select id="time" name="time">
                  <option value="default">Default sorting</option>
                </select>

                <div className="tickets">
                  <div className="ticket-type">
                    <label for="adults">Adults (18+ years)</label>
                    <div className="counter">
                      <button type="button" className="minus">
                        -
                      </button>
                      <input
                        type="number"
                        id="adults"
                        name="adults"
                        min="1"
                        value="1"
                      />
                      <button type="button" className="plus">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="ticket-type">
                    <label for="kids">Kids (13 years)</label>
                    <div className="counter">
                      <button type="button" className="minus">
                        -
                      </button>
                      <input
                        type="number"
                        id="kids"
                        name="kids"
                        min="0"
                        value="1"
                      />
                      <button type="button" className="plus">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="ticket-type">
                    <label for="children">Children (5+ years)</label>
                    <div className="counter">
                      <button type="button" className="minus">
                        -
                      </button>
                      <input
                        type="number"
                        id="children"
                        name="children"
                        min="0"
                        value="1"
                      />
                      <button type="button" className="plus">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="additional-services">
                  <label>Additional Service</label>
                  <div className="service-item">
                    <input type="checkbox" id="guide" name="guide" />
                    <label for="guide">Additional Guide</label>
                    <span>$420</span>
                  </div>
                  <div className="service-item">
                    <input type="checkbox" id="internet" name="internet" />
                    <label for="internet">Internet</label>
                    <span>$420</span>
                  </div>
                  <div className="service-item">
                    <input
                      type="checkbox"
                      id="photography"
                      name="photography"
                    />
                    <label for="photography">Photography</label>
                    <span>$420</span>
                  </div>
                </div>

                <p className="total-cost">
                  Total Cost: <span className="price">$800.00</span> / per
                  person
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
        </div>
      </div>
    </div>
  );
}

export default TourDetail;

import React from "react";

import balloon from "../../../images/ballon-1.jpeg";
import star from "../../../images/star.jpeg";
import northAmerica from "../../../images/blog-1-1.jpg";
import southAfrica from "../../../images/blog-1-2.jpg";
import costaRica from "../../../images/blog-1-3.jpg";
import europe from "../../../images/blog-1-4.jpg";
import topImage from "../../../images/blog-1-5.jpg";
import safetyIcon from "../../../images/safety.jpeg";
import aboutBg from "../../../images/about-bg.jpeg";
import "./style.css";

export default function Home() {
  return (
    <div>
      <div className="container-fluid text-center my-5 position-relative">
        <div className="row">
          <div className="col-12">
            <img
              src={balloon}
              alt="Balloon"
              className="balloonImage img-fluid"
            />
            <h2 className="topDestinations">Top Destinations</h2>
            <h1 className="title">
              Explore the Beautiful Places <br />
              Around the World
            </h1>
            <img src={star} alt="Star" className="starImage img-fluid" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row text-center">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardWrapper position-relative">
              <img
                src={northAmerica}
                className="img-fluid"
                alt="North America"
              />
              <div className="overlay"></div>
              <div className="cardText position-absolute">
                <h5>North America</h5>
                <p className="cardParagraph">13 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardWrapper position-relative">
              <img src={southAfrica} className="img-fluid" alt="South Africa" />
              <div className="overlay"></div>
              <div className="cardText position-absolute">
                <h5>South Africa</h5>
                <p className="cardParagraph">12 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardWrapper position-relative">
              <img src={costaRica} className="img-fluid" alt="Costa Rica" />
              <div className="overlay"></div>
              <div className="cardText position-absolute">
                <h5>Costa Rica</h5>
                <p className="cardParagraph">25 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardWrapper position-relative">
              <img src={europe} className="img-fluid" alt="Europe" />
              <div className="overlay"></div>
              <div className="cardText position-absolute">
                <h5>Europe</h5>
                <p className="cardParagraph">15 Tours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <div className="d-none d-md-flex flex-column align-items-start imageStack">
                <img
                  src={topImage}
                  className="topImage img-fluid mb-3"
                  alt="Top Image"
                />
                <img
                  src={southAfrica}
                  className="middleImage img-fluid mb-3"
                  alt="Middle Image"
                />
                <img
                  src={costaRica}
                  className="bottomImage img-fluid"
                  alt="Bottom Image"
                />
              </div>
              <img
                src={southAfrica}
                className="img-fluid d-block d-md-none"
                alt="Responsive Image"
              />
            </div>

            <div className="col-12 col-md-6">
              <h3 className="sectionTitle">About Company</h3>
              <h2 className="mainTitle">
                Sollicitudin Vestibulum <br />
                Vulputate Ipsum.
              </h2>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco.
              </p>

              <div className="feature d-flex align-items-center mb-3">
                <div className="icon mr-3">
                  <img src={safetyIcon} alt="Safety Icon" />
                </div>
                <div className="featureText">
                  <h5 className="iconName">Safety First Always</h5>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                </div>
              </div>

              <div className="feature d-flex align-items-center mb-3">
                <div className="icon mr-3">
                  <img src={safetyIcon} alt="Service Icon" />
                </div>
                <div className="featureText">
                  <h5 className="iconName">Nllamco laboris nisi</h5>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                </div>
              </div>

              <button className="btn btn-primary">Discover More</button>
            </div>
          </div>
        </div>
        <div className="backgroundOverlay">
          <img src={aboutBg} className="backgroundImage" alt="Background" />
        </div>
      </section>
    </div>
  );
}

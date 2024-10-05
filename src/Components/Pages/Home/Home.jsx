import React from "react";
import "./style.css";
import Balloon from "../../../images/ballon-1.jpeg";
import Star from "../../../images/star.jpeg";
import NorthAmerica from "../../../images/blog-1-1.jpg";
import SouthAfrica from "../../../images/blog-1-2.jpg";
import CostaRica from "../../../images/blog-1-3.jpg";
import Europe from "../../../images/blog-1-4.jpg";
import TopImage from "../../../images/blog-1-2.jpg";
import MiddleImage from "../../../images/person5.jpg";
import BottomImage from "../../../images/person3.jpg";

import SafetyIcon from "../../../images/safety.jpeg";
import AboutBg from "../../../images/about-bg.jpeg";

const Home = () => {
  return (
    <div>
      <div className="container con  text-center my-5 position-relative">
        <div className="row">
          <div className="col-12">
            <img src={Balloon} alt="Balloon" className="balloon" />
            <h2 className="top-destinations">Top Destinations</h2>
            <h1 className="title">
              Explore the Beautiful Places <br />
              Around the World
            </h1>
            <img src={Star} alt="Star" className="star" />
          </div>
        </div>
      </div>

      <div className="container con">
        <div className="row text-center">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card-container position-relative">
              <img
                src={NorthAmerica}
                className="img-fluid"
                alt="North America"
              />
              <div className="overlay"></div>
              <div className="card-text position-absolute">
                <h5>North America</h5>
                <p className="cardParagraph">13 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card-container position-relative">
              <img src={SouthAfrica} className="img-fluid" alt="South Africa" />
              <div className="overlay"></div>
              <div className="card-text position-absolute">
                <h5>South Africa</h5>
                <p className="cardParagraph">12 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card-container position-relative">
              <img src={CostaRica} className="img-fluid" alt="Costa Rica" />
              <div className="overlay"></div>
              <div className="card-text position-absolute">
                <h5>Costa Rica</h5>
                <p className="cardParagraph">25 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card-container position-relative">
              <img src={Europe} className="img-fluid" alt="Europe" />
              <div className="overlay"></div>
              <div className="card-text position-absolute">
                <h5>Europe</h5>
                <p className="cardParagraph">15 Tours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about-section position-relative">
        <div className="container con">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <div className="d-none d-md-flex flex-column align-items-start image-stack">
                <img
                  src={TopImage}
                  className="top-image img-fluid mb-3"
                  alt="Top Image"
                />
                <img
                  src={MiddleImage}
                  className="middle-image img-fluid mb-3"
                  alt="Middle Image"
                />
                <img
                  src={BottomImage}
                  className="bottom-image img-fluid"
                  alt="Bottom Image"
                />
              </div>
              <img
                src={MiddleImage}
                className="img-fluid d-block d-md-none"
                alt="Responsive Image"
              />
            </div>

            <div className="col-12 col-md-6">
              <h3 className="section-title">About Company</h3>
              <h2 className="main-title">
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
                  <img src={SafetyIcon} alt="Safety Icon" />
                </div>
                <div className="feature-text">
                  <h5 className="iconName">Safety First Always</h5>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                </div>
              </div>
              <div className="feature d-flex align-items-center mb-3">
                <div className="icon mr-3">
                  <img src={SafetyIcon} alt="Service Icon" />
                </div>
                <div className="feature-text">
                  <h5 className="iconName">Nllamco laboris nisi</h5>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                </div>
              </div>
              {/* Button */}
              <button className="btn btn-primary">Discover More</button>
            </div>
          </div>
        </div>
        {/* Background Image Overlay */}
        <div className="background-overlay">
          <img src={AboutBg} className="backgroundImage" alt="Background" />
        </div>
      </section>
    </div>
  );
};

export default Home;

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
import sunglass from "../../../images/sunGlass.png";
import bag from "../../../images/bag.png";
import featurImage1 from "../../../images/feature-1.jpg";
import featurImage2 from "../../../images/feature-1.jpg";
import featurImage3 from "../../../images/feature-1.jpg";

const Home = () => {
  return (
    <div>
      <div className="container-fluid   text-center my-5 position-relative">
        <div className="row">
          <div className="col-12">
            <img
              src={Balloon}
              alt="Balloon"
              className="balloon d-none d-md-inline-block"
            />
            <h2 className="textStyle">Top Destinations</h2>
            <h1 className="title">
              Explore the Beautiful Places <br />
              Around the World
            </h1>
            <img
              src={Star}
              alt="Star"
              className="star d-none d-md-inline-block"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row text-center">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardContainer position-relative">
              <img
                src={NorthAmerica}
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
            <div className="cardContainer position-relative">
              <img
                src={SouthAfrica}
                classeName="img-fluid"
                alt="South Africa"
              />
              <div className="overlay"></div>
              <div className="cardText position-absolute">
                <h5>South Africa</h5>
                <p className="cardParagraph">12 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardContainer position-relative">
              <img src={CostaRica} className="img-fluid" alt="Costa Rica" />
              <div className="overlay"></div>
              <div className="cardText position-absolute">
                <h5>Costa Rica</h5>
                <p className="cardParagraph">25 Tours</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="cardContainer position-relative">
              <img src={Europe} className="img-fluid" alt="Europe" />
              <div className="overlay"></div>
              <div className="cardText position-absolute">
                <h5>Europe</h5>
                <p className="cardParagraph">15 Tours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutPart position-relative">
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <div className="d-none d-md-flex flex-column align-items-start imageStack">
                <img
                  src={TopImage}
                  className="topImage img-fluid mb-3"
                  alt="Top Image"
                />
                <img
                  src={MiddleImage}
                  className="middleImage img-fluid mb-3"
                  alt="Middle Image"
                />
                <img
                  src={BottomImage}
                  className="bottomImage img-fluid"
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
                <div className="icons mr-3">
                  <img src={SafetyIcon} alt="Safety Icon" />
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
                <div className="icons mr-3">
                  <img src={SafetyIcon} alt="Service Icon" />
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
          <img src={AboutBg} className="backgroundImage" alt="Background" />
        </div>
      </div>

      <div className="featuredSection ">
        <div className="container-fluid">
          <div className="row pt-5 ">
            <div className="col-lg-auto col-md-4 col-12 text-center">
              <img
                src={sunglass}
                className="img-fluid d-none d-md-inline-block"
                alt="sunGlass"
              />
            </div>
            <div className="col-lg-auto col-md-4 col-12 text-center spacing">
              <h2 className="textStyle">Featured Tours</h2>
              <h1 className="fw-bold">Tour Packages</h1>
            </div>
            <div className="col-lg-auto col-md-4 col-12 text-center spacing">
              <img
                src={bag}
                className="img-fluid d-none d-md-inline-block"
                alt="bag image"
              />
            </div>
          </div>
        </div>

        <div className="container pb-5">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="card shadow-lg">
                <img
                  src={featurImage1}
                  className="card-img-top"
                  alt="sea image"
                />
                <div className="row position-absolute positionValues">
                  <div className="col-auto ">
                    <p className="text-white p-2 greenBackground">10% off</p>
                  </div>
                  <div className="col">
                    <p className="text-white p-2 orangBackground">Features</p>
                  </div>
                </div>
                <div className="row position-absolute  translateValues g-3">
                  <div className="col">
                    <p className="bg-dark rounded">
                      <i className="fa-regular fa-heart fa-lg p-2 py-3 iconsWhite"></i>
                    </p>
                  </div>
                  <div className="col">
                    <p className="bg-dark rounded">
                      <i className="fa-solid fa-camera fa-lg p-2 py-3 iconsWhite"></i>
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-1">
                    <div className=" col-auto">
                      <i className="fa-solid fa-location-dot greenColor"></i>
                    </div>
                    <div className="col">
                      <p>traford Park Lexington,40507</p>
                    </div>
                  </div>
                  <h5 className="card-title">Cuba Sailing Adventure</h5>
                  <div className="row g-1">
                    <div className="col-auto">
                      <i className="fa-solid fa-dollar-sign fa-lg greenColor"></i>
                    </div>
                    <div className="col ">
                      <p>
                        From<span className="orangColor">$116.10 </span>
                      </p>
                    </div>
                    <div className="col-auto">
                      <p className="orangColor">4.5</p>
                    </div>
                    <div className="col">
                      <p>(1.5k review)</p>
                    </div>
                  </div>
                  <div className="card-text"></div>
                  <div className="border-bottom border-dark w-sm-100 mb-4"></div>
                  <div className="row g-lg-1 gx-sm-2">
                    <div className="col-auto">
                      <i className="fa-regular fa-clock fa-lg greenColor"></i>
                    </div>
                    <div className="col">
                      <p>6 days</p>
                    </div>
                    <div className="col col-lg-auto">
                      <a
                        href="#"
                        className="btn text-white greenBackground buttonHover"
                      >
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card shadow-lg">
                <img
                  src="./assests/images/img-2.jpg"
                  className="card-img-top"
                  alt="sea image"
                />
                <p className="text-white p-2 position-absolute positionValues greenBackground">
                  10% off
                </p>
                <div className="row position-absolute  translateValues g-3">
                  <div className="col">
                    <p className="bg-dark rounded">
                      <i className="fa-regular fa-heart fa-lg p-2 py-3 iconsWhite"></i>
                    </p>
                  </div>
                  <div className="col">
                    <p className="bg-dark rounded">
                      <i className="fa-solid fa-camera fa-lg p-2 py-3 iconsWhite"></i>
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-1">
                    <div className="col-auto">
                      <i className="fa-solid fa-location-dot greenColor"></i>
                    </div>
                    <div className="col">
                      <p>traford Park Lexington,40507</p>
                    </div>
                  </div>
                  <h5 className="card-title">Tour in New York</h5>
                  <div className="row g-1">
                    <div className="col-auto">
                      <i className="fa-solid fa-dollar-sign fa-lg greenColor"></i>
                    </div>
                    <div className="col ">
                      <p>
                        From<span className="orangColor">$116.10 </span>
                      </p>
                    </div>
                    <div className="col-auto">
                      <p className="orangColor">4.5</p>
                    </div>
                    <div className="col">
                      <p>(1.5k review)</p>
                    </div>
                  </div>
                  <div className="card-text"></div>
                  <div className="border-bottom border-dark w-sm-100 mb-4"></div>
                  <div className="row g-1">
                    <div className="col-auto">
                      <i className="fa-regular fa-clock fa-lg greenColor"></i>
                    </div>
                    <div className="col">
                      <p>6 days</p>
                    </div>
                    <div className="col col-lg-auto">
                      <a
                        href="#"
                        className="btn text-white buttonHover greenBackground"
                      >
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card shadow-lg">
                <img
                  src="./assests/images/img-3.jpg"
                  className="card-img-top "
                  alt="sea image"
                />
                <p className="text-white p-2 position-absolute positionValues greenBackground">
                  10% off
                </p>
                <div className="row position-absolute  translateValues g-3">
                  <div className="col">
                    <p className="bg-dark rounded">
                      <i className="fa-regular fa-heart fa-lg p-2 py-3 iconsWhite"></i>
                    </p>
                  </div>
                  <div className="col">
                    <p className="bg-dark rounded">
                      <i className="fa-solid fa-camera fa-lg p-2 py-3 iconsWhite"></i>
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-1">
                    <div className="col-auto">
                      <i className="fa-solid fa-location-dot greenColor"></i>
                    </div>
                    <div className="col-auto">
                      <p>traford Park Lexington,40507</p>
                    </div>
                  </div>
                  <h5 className="card-title">Museum of Modern Art</h5>
                  <div className="row g-1">
                    <div className="col-auto">
                      <i className="fa-solid fa-dollar-sign fa-lg greenColor"></i>
                    </div>
                    <div className="col ">
                      <p>
                        From<span className="orangColor">$116.10 </span>
                      </p>
                    </div>
                    <div className="col-auto">
                      <p className="orangColor">4.5</p>
                    </div>
                    <div className="col">
                      <p>(1.5k review)</p>
                    </div>
                  </div>
                  <div className="card-text"></div>
                  <div className="border-bottom border-dark w-sm-100 mb-4"></div>
                  <div className="row g-1">
                    <div className="col-auto">
                      <i className="fa-regular fa-clock fa-lg greenColor"></i>
                    </div>
                    <div className="col">
                      <p>6 days</p>
                    </div>
                    <div className="col col-lg-auto">
                      <a
                        href="#"
                        className="btn text-white buttonHover greenBackground"
                      >
                        Explore More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

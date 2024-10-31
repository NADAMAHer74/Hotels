import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBurst,
  faCamera,
  faHeart,
  faLocationDot,
  faDollar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import Balloon from "../../../images/ballon-1.jpeg";
import Star from "../../../images/star.jpeg";
import videoBg from "../../../images/video-bg.jpg";
import ticket from "../../../images/ticket.png";

import SafetyIcon from "../../../images/safety.jpeg";
import AboutBg from "../../../images/about-bg.jpeg";
import sunglass from "../../../images/sunGlass.png";
import bag from "../../../images/bag.png";

import rocket from "../../../images/inn-rocket.png";
import {
  fetchDestination,
  fetchAbout,
  fetchTour,
  fetchBlog,
  fetchAboutContent,
  fetchBannerHome,
} from "../../../APIs/HomeApi";

const Home = () => {
  const imagesClasses = [
    { className: "topImage" },
    { className: "middleImage" },
    { className: "bottomImage" },
    // Add more images as needed
  ];
  const distination = useSelector((state) => state.home.distinationData);
  const about = useSelector((state) => state.home.aboutData);
  const tour = useSelector((state) => state.home.tourData);
  const blog = useSelector((state) => state.home.blogData);
  const aboutContent = useSelector((state) => state.home.aboutContent);
  const bannerHome = useSelector((state) => state.home.bannerHomeData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDestination());
    dispatch(fetchAbout());
    dispatch(fetchTour());
    dispatch(fetchBlog());
    dispatch(fetchAboutContent());
    dispatch(fetchBannerHome());
  }, [dispatch]);
  const visibleBanners = bannerHome
    ?.filter((banner) => banner.visible === 1)
    .slice(1, 4);
  return (
    <div>
      <section className="homeBanner">
        <div className="BannerContent">
          {visibleBanners.map((banner, index) => (
            <img
              key={index}
              src={`http://localhost:1000/${banner.image}`}
              alt="background"
              className="BannerImage"
            />
          ))}
          <div className="BannerText">
            <h3>Memories For Life</h3>
            <h1>Let's Explore The World</h1>
          </div>
        </div>
      </section>
      <div className="topDestinationSection">
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
            {distination ? (
              distination.map((item) => (
                <div
                  className="col-12 col-md-6 col-lg-3 mb-4"
                  key={item.destination_id}
                >
                  <div className="cardContainer position-relative">
                    <img
                      src={`http://localhost:1000/${item.image}`}
                      className="img-fluid"
                      alt="distination"
                    />
                    <div className="overlay"></div>
                    <div className="cardText position-absolute">
                      <h5>{item.location}</h5>
                      <p className="cardParagraph">13 Tours</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>

      <div className="aboutPart">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-4 mb-md-0 align-items-start">
              <div className="align-items-start imageStack">
                {about ? (
                  about.map((aboutImage, index) => (
                    <div key={index} className={`image-${index}`}>
                      <img
                        className="img-fluid mb-3"
                        src={`http://localhost:1000/${aboutImage.Image}`}
                        alt="About Image"
                      />
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>

            <div className="col-12 col-md-6 aboutContent">
              <h3 className="sectionTitle">About Company</h3>
              <h2 className="mainTitle">{aboutContent.head}</h2>
              <p className="description">{aboutContent.Body}</p>
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
            {tour ? (
              tour.map((tourItem) => (
                <div className="col-lg-4 col-md-6" key={tourItem.tour_id}>
                  <div className="card shadow-lg">
                    <img
                      src={`http://localhost:1000/${tourItem.tourImage}`}
                      className="card-img-top"
                      alt="sea image"
                    />
                    <div className="row position-absolute positionValues">
                      <div className="col-auto ">
                        <p className="text-white p-2 greenBackground">
                          10% off
                        </p>
                      </div>
                      <div className="col">
                        <p className="text-white p-2 orangBackground">
                          Features
                        </p>
                      </div>
                    </div>
                    <div className="row position-absolute  translateValues g-3">
                      <div className="col">
                        <p className="bg-dark rounded">
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="iconsWhite fa-lg p-2  fa-regular "
                          />
                        </p>
                      </div>
                      <div className="col">
                        <p className="bg-dark rounded">
                          <FontAwesomeIcon
                            icon={faCamera}
                            className="iconsWhite fa-lg p-2 "
                          />
                        </p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-1">
                        <div className=" col-auto">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="greenColor "
                          />
                        </div>
                        <div className="col">
                          <p>
                            {" "}
                            {tour.location}
                            {tourItem.location}
                          </p>
                        </div>
                      </div>
                      <h5 className="card-title">{tourItem.name}</h5>
                      <div className="row g-1">
                        <div className="col-auto">
                          <FontAwesomeIcon
                            icon={faDollar}
                            className="greenColor fa-lg "
                          />
                        </div>
                        <div className="col ">
                          <p>
                            From
                            <span className="orangColor">
                              ${tourItem.adultPrice}{" "}
                            </span>
                          </p>
                        </div>
                        <div className="col-auto">
                          <p className="orangColor">{tourItem.reviewStars}</p>
                        </div>
                        <div className="col">
                          <p>(1.5k review)</p>
                        </div>
                      </div>
                      <div className="card-text"></div>
                      <div className="border-bottom border-dark w-sm-100 mb-4"></div>
                      <div className="row g-lg-1 gx-sm-2">
                        <div className="col-auto">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="greenColor fa-lg "
                          />
                        </div>
                        <div className="col">
                          <p>{tourItem.durationInDays}</p>
                        </div>
                        <div className="col col-lg-auto">
                          <Link
                            to={`/tourdetail/${tour.tour_id}`}
                            className="btn text-white greenBackground buttonHover"
                          >
                            Explore More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>
      </div>

      <div className="videoBlock videoOverlay position-relative overflow-hidden">
        <img
          className="videoBackgroundImg"
          src={videoBg}
          alt="Video Background"
        />
        <div className="container">
          <div className="row position-relative align-items-center position-relative z-1 ">
            <div className="col">
              <div className="videoContent">
                <h3 className="videoAboutSubtitle mb-4">
                  Ready to travel with real adventure and enjoy natural
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
                <div className="videoBtn">
                  <a
                    href="contact.html"
                    className="btn d-inline-block text-capitalize"
                  >
                    Start Booking
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 ">
              <div className="videoBlockRight position-relative d-flex align-items-center justify-content-center">
                <div className="videoIcon">
                  <a
                    className="popupVideo position-relative d-inline-block text-center z-1"
                    href="https://www.youtube.com/watch?v=8mSG40o-iJ0"
                  >
                    <i className="fa-solid fa-play"></i>
                  </a>
                </div>
                <div className="videoKite position-absolute d-none d-xxl-block">
                  <img src={rocket} alt="rocket image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid orangBackground">
        <div className="container">
          <div className="row text-white py-3  iconsWhite">
            <div className="col">
              <h4 className="fw-bold">835 +</h4>
              <p>Total Donations</p>
            </div>
            <div className="col my-auto">
              <FontAwesomeIcon icon={faBurst} className="fa-2xl" />
            </div>
            <div className="col">
              <h4 className="fw-bold">6246 +</h4>
              <p>Campaigns closed</p>
            </div>
            <div className="col my-auto">
              <FontAwesomeIcon icon={faBurst} className="fa-2xl" />
            </div>
            <div className="col">
              <h4 className="fw-bold">1000 +</h4>
              <p>Happy people</p>
            </div>
            <div className="col my-auto">
              <FontAwesomeIcon icon={faBurst} className="fa-2xl" />
            </div>
            <div className="col">
              <h4 className="fw-bold">600 +</h4>
              <p>Our Vlounteers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="blogSection">
        <img
          className="sticker img-fluid d-none d-md-inline-block"
          src={ticket}
        />
        <div className="container">
          <h3>Our Recent Blog</h3>
          <h2 className="headBold">Amazing news & blog for every update</h2>
          <div className="row">
            {blog ? (
              blog.map((blog) => (
                <div className=" col-12 col-md-6 col-lg-4 " key={blog.blog_id}>
                  <div className=" travelCard ">
                    <div className="position-relative">
                      <img
                        src={`http://localhost:1000/${blog.imageUrl}`}
                        alt="Travel Image"
                      />
                      <div className="categoryBadge">{blog.title}</div>
                    </div>
                  </div>
                  <div className="cardBody">
                    <p className="card-date">
                      <i className="fas fa-calendar-alt calenderSticker"></i>{" "}
                      {blog.created_at}
                    </p>
                    <h5 className="cardTitle">{blog.content}</h5>
                    <Link
                      to={`/Blogdetail/${blog.blog_id}`}
                      className="cardBtn"
                    >
                      Explore More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

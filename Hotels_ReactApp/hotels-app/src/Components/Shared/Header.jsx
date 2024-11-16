import React from "react";
import { useEffect, useState } from "react";
import "./general.css";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import AuthModal from "./AuthModal/AuthModal";

import logo from "../../images/logo.png";

function Header() {
  const [isContactMenuVisible, setContactMenuVisible] = useState(false);
  const location = useLocation(); // Hook to get the current route
  useEffect(() => {
    setContactMenuVisible(false);
  }, [location]);

  const handleTopMenu = () => {
    setContactMenuVisible(!isContactMenuVisible);
  };
  return (
    <div>
      <header>
        <div className="topBar ">
          <div className="container d-flex justify-content-between align-items-center flex-sm-row">
            <div className="dropdownCompanyInfo d-xl-none d-lg-none  d-inline-block">
              <i
                className="fa-solid fa-chevron-right toggleChevron"
                onClick={handleTopMenu}
              ></i>
              <a className="text-decoration-none text-light" href="#">
                <i className="fa-solid fa-phone-volume"></i>
                (000) 967-237-96
              </a>
              <ul
                className={`contactMenu collapseList ${isContactMenuVisible ? "d-flex" : "d-none"
                  }`}
              >
                <li className="p-3">
                  <a
                    className="text-decoration-none d-flex align-items-center"
                    href="#"
                  >
                    <i className="fa-solid fa-phone-volume"></i>
                    (000) 967-237-96
                  </a>
                </li>
                <li className="p-3">
                  <Link
                    className="text-decoration-none d-flex align-items-center"
                    to="#"
                  >
                    <i className="fa-regular fa-envelope"></i>
                    toursinfo@gmail.com
                  </Link>
                </li>
                <li className="p-3">
                  <a
                    className="text-decoration-none d-flex align-items-center"
                    href="#"
                  >
                    <i className="fa-solid fa-location-dot"></i>
                    290 Grand Avenue Maitland, FL 32751
                  </a>
                </li>
              </ul>
            </div>

            <div className="contactInfo">
              <a href="#">
                <i className="fa-solid fa-phone-volume"></i>
                <span>(000) 967-237-96</span>
              </a>
              <a href="#">
                <i className="fa-regular fa-envelope"></i>
                <span>toursinfo@gmail.com</span>
              </a>
              <a href="#">
                {" "}
                <i className="fa-solid fa-location-dot"></i>
                <span>290 Grand Avenue Maitland, FL 32751</span>
              </a>
            </div>
            <div className="socialIcons b-0">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-skype"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <nav
          className="navbar sticky-top navbar-expand-lg bg-white "
          data-bs-theme="dark"
        >
          <div className="container text-dark justify-content-between">
            <Link to="/">
              <img src={logo} alt="Logo" width="108" height="29" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item me-4">
                  <Link
                    to="/"
                    className="nav-link active text-dark"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item dropdown me-4">
                  <Link
                    className="nav-link  text-dark"
                    to="/tourgrid"
                  /* id="navbarDropdownTours"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false" */
                  >
                    Tours
                  </Link>
                  {/* <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownTours"
                  >
                    <li>
                      <Link className="dropdown-item" to="/tourgrid">
                        Tour
                      </Link>
                    </li>
                    <li>
                       <Link className="dropdown-item" to="/tourdetail">
                        Tour Detail
                      </Link> 
                    </li>
                  </ul> */}
                </li>
                <li className="nav-item me-4">
                  <Link to="/destination" className="nav-link text-dark">
                    Destination
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link to="/about" className="nav-link text-dark">
                    About
                  </Link>
                </li>

                <li className="nav-item dropdown me-4">

                  <Link
                    className="nav-link  text-dark"
                    to="/blog"

                  /* id="navbarDropdownBlog"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false" */
                  >
                    Blog
                  </Link>
                  {/* <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownBlog"
                  >
                    <li>
                      <Link className="dropdown-item" to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/blogdetail">
                        Blog Detail
                      </Link>
                    </li>
                  </ul> */}
                </li>
              </ul>

              {/* <div className="contactNavBtn ms-auto">
                <Link to="/contact">Contact Us</Link>
              </div> */}
              <div className="navBtns ms-auto d-flex">
                {/* <Link className="registrationBtn" to="/authModal">
                  <FontAwesomeIcon icon={faCircleUser} />
                  <span>Sign In</span>
                </Link> */}
                <AuthModal />
                <Link className="contactBtn align-content-center" to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
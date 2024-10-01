import React from "react";
import { useEffect } from "react";
import "./general.css";
import { Link } from "react-router-dom";

import logo from "../../images/logo.png";
import "./script.js";

function Header() {
  useEffect(() => {
    // The custom.js will be executed when this component mounts
    const mybutton = document.getElementById("scrollTop");

    // Cleanup the event listener when the component unmounts
    return () => {
      mybutton.removeEventListener("click", backToTop);
    };
  }, []);

  // Define backToTop function within the component for access to component context
  const backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  return (
    <div>
      <header>
        <div className="topBar ">
          <div className="container d-flex justify-content-between align-items-center flex-sm-row">
            <div className="dropdownCompanyInfo d-xl-none d-lg-none  d-inline-block">
              <i className="fa-solid fa-chevron-right toggleChevron"></i>
              <a className="text-decoration-none text-light" href="#">
                <i className="fa-solid fa-phone-volume"></i>
                (000) 967-237-96
              </a>
              <ul className="contactMenu collapseList">
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
                    className="nav-link dropdown-toggle text-dark"
                    to="#"
                    id="navbarDropdownTours"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tours
                  </Link>
                  <ul
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
                  </ul>
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
                  <a
                    className="nav-link dropdown-toggle text-dark"
                    href="#"
                    id="navbarDropdownBlog"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Blog
                  </a>
                  <ul
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
                  </ul>
                </li>
              </ul>
              <div className="contactNavBtn ms-auto">
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;

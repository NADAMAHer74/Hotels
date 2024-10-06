import React from "react";
import "./general.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import leftTreeImg from "../../../src/images/left-tree.png"
import rightTreeImg from "../../../src/images/right-tree.png"
import logo from "../../images/logo.png";


import "./script.js";

function Footer() {
  // useEffect(() => {

  //     const mybutton = document.getElementById("scrollTop");
  //     return () => {
  //       mybutton.removeEventListener("click", backToTop);
  //     };
  //   }, []);
  //   const backToTop = () => {
  //     document.body.scrollTop = 0;
  //     document.documentElement.scrollTop = 0;
  //   };
  return (
    <div>
      <div className="footer overflow-hidden position-relative">
        <div className="footerLeftShape position-absolute">
          <img src={leftTreeImg} alt="footerBackgroundL" />
        </div>
        <div className="footerRightShape position-absolute">
          <img src={rightTreeImg} alt="footerBackgroundR" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="footerBlock fotCol1">
                <div className="footerLogo">
                  <a href="index.html">
                    <img src={logo} alt="Travello" />
                  </a>
                </div>
                <div className="footerContent">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    doeiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut
                  </p>
                  <div className="footerSocialIcons position-relative">
                    <a href="#">
                      <i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#">
                      <i className="fa-brands fa-twitter"></i></a>
                    <a href="#">
                      <i className="fa-brands fa-skype"></i>
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="footerBlock fotCol2">
                <h3 className="footerBlockTitle text-uppercase text-decoration-underline">
                  Company:
                </h3>
                <div className="footerList">
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <a href="about-us.html">About us</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog update</a>
                    </li>
                    <li>
                      <a href="#">Our services</a>
                    </li>
                    <li>
                      <a href="#">Testimonial</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="footerBlock fotCol3">
                <h3 className="footerBlockTitle text-uppercase text-decoration-underline">
                  Quick links:
                </h3>
                <div className="footerList">
                  <ul>
                    <li>
                      <a href="#">Privacy & policy</a>
                    </li>
                    <li>
                      <a href="#">Terms & conditions</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">Hydropower Plants</a>
                    </li>
                    <li>
                      <a href="#">Customer support</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 z-3">
              <div className="footerBlock fotCol4">
                <h3 className="footerBlockTitle text-uppercase text-decoration-underline">
                  Subscribe Newsletter:
                </h3>
                <div className="footerForm">
                  <form action="#">
                    <div className="footerInput">
                      <input
                        id="email"
                        autoComplete="email"
                        type="email"
                        placeholder="Enter Your Email:"
                      />
                    </div>
                    <button type="submit" className="btn footerBtn">
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright z-3 position-relative">
        <div className="container">
          <div className="copyrightWrap z-2">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="copyrightText text-center text-lg-start">
                  <p className="mb-0">
                    Copyright © 2024{" "}
                    <span>
                      <a href="#">Travello</a>
                    </span>{" "}
                    All Right Reserved
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block">
                <div className="copyrightPrivacy text-end">
                  <a className="text-decoration-none" href="#">
                    Privacy & Policy || Terms & Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        id="scrollTop"
        className="btn scrollTop"

        title="Go to top"
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>
    </div>
  );
}

export default Footer;

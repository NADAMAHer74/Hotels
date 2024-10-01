import React from "react";
import "./style.css";
import blog1 from "../../../blog-1-1.jpg";
import blog2 from "../../../blog-1-2.jpg";
import blog3 from "../../../blog-1-3.jpg";
import blog4 from "../../../blog-1-4.jpg";
import blog5 from "../../../blog-1-5.jpg";
import blog6 from "../../../blog-1-6.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Blog() {
  return (
    <>
      <section className="blog">
        <div className="container ">
          <div className="row  gy-4 ">
            <div className="col-lg-4 col-md-6 parent">
              <div className="card shadow-lg">
                <div className="overflow-hidden">
                  <img src={blog1} className="card-img-top" alt="blogImage" />
                </div>

                <p className="text-white p-2 position-absolute positionValues orangBackground">
                  Adventure
                </p>

                <div className="card-body">
                  <div className="row g-2">
                    <div className=" col-auto greenColor">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <div className="col">
                      <p className="text-secondary">March 28, 2023</p>
                    </div>
                  </div>
                  <h4 className="card-title">
                    You Should See things
                    <br /> when visiting Japan
                  </h4>

                  <div className="row g-lg-1 gx-sm-2 mt-3">
                    <div className="col-auto">
                      <p className="greenColor">Read more</p>
                    </div>
                    <div className="col greenColor">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 parent ">
              <div className="card shadow-lg">
                <div className="overflow-hidden">
                  <img src={blog2} className="card-img-top" alt="blogImage" />
                </div>

                <p className="text-white p-2 position-absolute positionValues orangBackground">
                  City Tours
                </p>

                <div className="card-body">
                  <div className="row g-2">
                    <div className=" col-auto greenColor">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <div className="col">
                      <p className="text-secondary">March 28, 2023</p>
                    </div>
                  </div>
                  <h4 className="card-title">
                    A Place where start new
                    <br /> life with adventure travel
                  </h4>

                  <div className="row g-lg-1 gx-sm-2 mt-3">
                    <div className="col-auto">
                      <p className="greenColor">Read more</p>
                    </div>
                    <div className="col greenColor">
                      <FontAwesomeIcon icon={faArrowRight} />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-lg-4 col-md-6 parent">
              <div className="card shadow-lg">
                <div className="overflow-hidden">
                  <img src={blog3} className="card-img-top" alt="blogImage" />
                </div>

                <p className="text-white p-2 position-absolute positionValues orangBackground">
                  Adventure
                </p>

                <div className="card-body">
                  <div className="row g-2">
                    <div className=" col-auto greenColor">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <div className="col">
                      <p className="text-secondary">March 28, 2023</p>
                    </div>
                  </div>
                  <h4 className="card-title">
                    A Place where start new
                    <br /> life with adventure Dhaka
                  </h4>

                  <div className="row g-lg-1 gx-sm-2 mt-3">
                    <div className="col-auto">
                      <p className="greenColor">Read more</p>
                    </div>
                    <div className="col greenColor">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 gy-4">
            <div className="col-lg-4 col-md-6 parent">
              <div className="card shadow-lg">
                <div className="overflow-hidden">
                  <img src={blog4} className="card-img-top" alt="blogImage" />
                </div>

                <p className="text-white p-2 position-absolute positionValues orangBackground">
                  Adventure
                </p>

                <div className="card-body">
                  <div className="row g-2">
                    <div className=" col-auto greenColor">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <div className="col">
                      <p className="text-secondary">March 28, 2023</p>
                    </div>
                  </div>
                  <h4 className="card-title">
                    You Should See things
                    <br /> when visiting Japan
                  </h4>

                  <div className="row g-lg-1 gx-sm-2 mt-3">
                    <div className="col-auto">
                      <p className="greenColor">Read more</p>
                    </div>
                    <div className="col greenColor">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 parent">
              <div className="card shadow-lg">
                <div className="overflow-hidden">
                  <img src={blog5} className="card-img-top" alt="blogImage" />
                </div>

                <p className="text-white p-2 position-absolute positionValues orangBackground">
                  City Tours
                </p>

                <div className="card-body">
                  <div className="row g-2">
                    <div className=" col-auto greenColor">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <div className="col">
                      <p className="text-secondary">March 28, 2023</p>
                    </div>
                  </div>
                  <h4 className="card-title">
                    A Place where start new
                    <br /> life with adventure travel
                  </h4>

                  <div className="row g-lg-1 gx-sm-2 mt-3">
                    <div className="col-auto">
                      <p classNameName="greenColor">Read more</p>
                    </div>
                    <div className="col greenColor">
                      <FontAwesomeIcon icon={faArrowRight} />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 parent ">
              <div className="card shadow-lg">
                <div className="overflow-hidden">
                  <img src={blog6} className="card-img-top" alt="blogImage" />
                </div>

                <p className="text-white p-2 position-absolute positionValues orangBackground">
                  Adventure
                </p>

                <div className="card-body">
                  <div className="row g-2">
                    <div className=" col-auto greenColor">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <div className="col">
                      <p className="text-secondary">March 28, 2023</p>
                    </div>
                  </div>
                  <h4 className="card-title">
                    A Place where start new
                    <br /> life with adventure Dhaka
                  </h4>

                  <div className="row g-lg-1 gx-sm-2 mt-3">
                    <div className="col-auto">
                      <p className="greenColor">Read more</p>
                    </div>
                    <div className="col greenColor">
                      <FontAwesomeIcon icon={faArrowRight} />{" "}
                    </div>
                  </div>
                </div>
              </div>
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
        </div>
      </section>
    </>
  );
}

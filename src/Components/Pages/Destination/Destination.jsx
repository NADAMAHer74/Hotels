import React from "react";
import "./style.css";
import person1 from "../../../images/person1.jpg";
import person2 from "../../../images/person2.jpg";
import person3 from "../../../images/person3.jpg";
import person4 from "../../../images/person4.jpg";
import person5 from "../../../images/person5.jpg";
import person6 from "../../../images/person6.jpg";
import MainBanner from "../MainBanner/MainBanner";
export default function Destination() {
  return (
    <>
      <MainBanner title="Destination" />

      <section className="destination">
        <div className="container ">
          <div className="row">
            <div className="col-lg-4 col-md-4 parent">
              <div className="overflow-hidden">
                <img className="w-100 rounded" src={person1} alt="person1" />
              </div>

              <h2>Discover Island</h2>
              <p className="greenColor">Adventure</p>
            </div>
            <div className="col-lg-4 col-md-4 parent">
              <div className="overflow-hidden">
                <img className="w-100 rounded" src={person2} alt="person2" />
              </div>

              <h2>Cuba Sailing Adventure</h2>
              <p className="greenColor">Adventure</p>
            </div>
            <div className="col-lg-4 col-md-4 parent">
              <div className="overflow-hidden">
                <img className="w-100 rounded" src={person3} alt="person3" />
              </div>

              <h2>Tour in New York</h2>
              <p className="greenColor">Adventure</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-4 col-md-4 parent">
              <div className="overflow-hidden">
                <img className="w-100 rounded" src={person4} alt="person4" />
              </div>

              <h2>Dhaka Bangladesh</h2>
              <p className="greenColor">Adventure</p>
            </div>
            <div className="col-lg-4 col-md-4 parent">
              <div className="overflow-hidden">
                <img className="w-100 rounded" src={person5} alt="person5" />
              </div>

              <h2>San Martens</h2>
              <p className="greenColor">Adventure</p>
            </div>
            <div className="col-lg-4 col-md-4 parent">
              <div className="overflow-hidden">
                <img
                  className="w-100 rounded overflow-hidden"
                  src={person6}
                  alt="person6"
                />
              </div>

              <h2>Swizer Land</h2>
              <p className="greenColor">Adventure</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

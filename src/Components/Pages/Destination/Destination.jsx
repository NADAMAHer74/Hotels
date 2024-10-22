import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import person1 from "../../../images/person1.jpg";
import person2 from "../../../images/person2.jpg";
import person3 from "../../../images/person3.jpg";
import person4 from "../../../images/person4.jpg";
import person5 from "../../../images/person5.jpg";
import person6 from "../../../images/person6.jpg";
import MainBanner from "../MainBanner/MainBanner";
import { fetchDestinations } from "../../../APIs/DistinationApi";
import { useDispatch } from "react-redux";
function Destination() {
  const distinationItems = useSelector(
    (state) => state.distination.destinations
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDestinations()).then(() => {});
  });
  return (
    <>
      <MainBanner title="Destination" />

      <section className="destination">
        <div className="container ">
          <div className="row">
            {distinationItems ? (
              distinationItems.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6 parent">
                  <div className="overflow-hidden">
                    <img
                      className="w-100 rounded"
                      src={item.image_url}
                      alt={item.name}
                    />
                  </div>
                  <h2>{item.name}</h2>
                  <p className="greenColor">Adventure</p>
                </div>
              ))
            ) : (
              <div> no data</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Destination;

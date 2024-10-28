import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

import MainBanner from "../MainBanner/MainBanner";
import { fetchDestinations } from "../../../APIs/DistinationApi";
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
                <div
                  key={item.destination_id}
                  className="col-lg-4 col-md-6 parent"
                >
                  <div className="overflow-hidden">
                    <img
                      className="w-100 rounded"
                      src={`http://localhost:2000/${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <h2>{item.name}</h2>
                  <p className="greenColor">{item.category}</p>
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

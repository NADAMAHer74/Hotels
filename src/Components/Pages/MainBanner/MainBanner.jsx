import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../../../APIs/MainBannerApi";
import { Link } from "react-router-dom";
import "./MainBannercss.css";

function MainBanner(props) {
  const dispatch = useDispatch();
  const { bannerData, status, error } = useSelector((state) => state.banner);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBanner());
    }
  }, [status, dispatch]);

  // Find the first visible image
  const visibleImage = bannerData.find((banner) => banner.visible === 1);

  return (
    <div>
<<<<<<< HEAD
      <div className="mainBanner position-relative d-flex align-items-center justify-content-center z-1">
        <img
          src={`http://localhost:1000/${bannerData.image}`}
          draggable="false"
          className="mainBannerImg"
          alt="mainBanner"
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="bannerContent">
                <div className="bannerTitleBox">
                  <h3 className="text-uppercase text-center">{props.title}</h3>
                </div>
                <div className="bannerBreadcrumbListWrap position-absolute text-center">
                  <div className="bannerBreadcrumbListContent d-inline-block">
                    <span>
                      <Link className="text-decoration-none" to="/">
                        home
                      </Link>
                    </span>
                    <span> // </span>
                    <span>{props.title}</span>
=======
      {visibleImage ? (
        <div className="mainBanner position-relative d-flex align-items-center justify-content-center z-1">
          <img
            src={`http://localhost:1000/${visibleImage.image}`}
            draggable="false"
            className="mainBannerImg"
            alt="mainBanner"
          />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="bannerContent">
                  <div className="bannerTitleBox">
                    <h3 className="text-uppercase text-center">{props.title}</h3>
                  </div>
                  <div className="bannerBreadcrumbListWrap position-absolute text-center">
                    <div className="bannerBreadcrumbListContent d-inline-block">
                      <span>
                        <Link className="text-decoration-none" to="/">
                          home
                        </Link>
                      </span>
                      <span> // </span>
                      <span>{props.title}</span>
                    </div>
>>>>>>> b7edde223d82121660b60e7a96642e64f2ba22cf
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null} {/* Only render if there's a visible image */}
    </div>
  );
}

export default MainBanner;
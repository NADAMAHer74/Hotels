import React from "react";
import "./MainBannercss.css";
import { Link } from "react-router-dom";

import breadcrumb from "../../../images/breadcrumb.jpg";

function MainBanner(props) {
  return (
    <div>
      <div className="mainBanner position-relative d-flex align-items-center justify-content-center z-1">
        <img
          src={breadcrumb}
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
                    <span>//</span>
                    <span>{props.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;

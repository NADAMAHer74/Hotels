import React from "react";
import "./MainBannercss.css";
import { Link } from "react-router-dom";

import breadcrumb from "../../../images/breadcrumb.jpg";

function MainBanner(props) {
  return (
    <div>
      <div class="mainBanner position-relative d-flex align-items-center justify-content-center z-1">
        <img
          src={breadcrumb}
          draggable="false"
          class="mainBannerImg"
          alt="mainBanner"
        />
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="bannerContent">
                <div class="bannerTitleBox">
                  <h3 class="text-uppercase text-center">{props.title}</h3>
                </div>
                <div class="bannerBreadcrumbListWrap position-absolute text-center">
                  <div class="bannerBreadcrumbListContent d-inline-block">
                    <span>
                      <Link class="text-decoration-none" to="/">
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

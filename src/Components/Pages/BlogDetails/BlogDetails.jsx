import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainBanner from "../MainBanner/MainBanner";
import "./BlogDetails.css"; // Import CSS for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import slider from "../../../images/slider-1-1.jpg";
import blog from "../../../images/blog-1-4.jpg";


const BlogDetails = () => {
  return (
    <>
    <MainBanner title="Blog Details" />
    <div className="container content-section">
      <div className="row">
        {/* Main Content */}
        <div className="col-md-8">
          <div className="blog-post">
            <img src={slider} alt="Travel Blog" height="400px" />
            <div className="post-meta d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-success" />
              <span>14 Jan 2024</span>
            </div>
            <h2>Top travel blogs to discover this winter</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-md-4 recent-posts">
          <h4>Recent posts:</h4>
          {/* Recent Post Item */}
          <div className="recent-post d-flex">
            <img src={blog} alt="Recent Post 1" />
            <div>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} /> 02 Jan, 2024
              </p>
              THINGS TO SEE AND DO WHEN VISITING JAPAN
            </div>
            <hr />
          </div>
          <hr />
          {/* Recent Post Item */}
          <div className="recent-post d-flex">
            <img src={blog} alt="Recent Post 2" />
            <div>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} /> 02 Jan, 2024
              </p>
              A PLACE WHERE TO START NEW LIFE WITH ADVENTURE TRAVEL
            </div>
          </div>
          <hr />

          {/* Recent Post Item */}
          <div className="recent-post d-flex">
            <img src={blog} alt="Recent Post 3" />
            <div>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} /> 02 Jan, 2024
              </p>
              THE VIBRANT HARBOR CITY DOWN UNDER
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogDetails;

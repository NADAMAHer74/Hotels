import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainBanner from "../MainBanner/MainBanner";
import "./BlogDetails.css"; // Import CSS for styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import slider from "../../../images/slider-1-1.jpg";
import blog from "../../../images/blog-1-4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../../../APIs/BlogDetailApi";
import { useParams } from "react-router-dom";
const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogData = useSelector((state) => state.Blogs.blog);
  useEffect(() => {
    dispatch(fetchBlogData({ id }));
  }, [dispatch, id]);

  return (
    <>
      <MainBanner title="Blog Details" />
      <div className="container content-section">
        <div className="row">
          {/* Main Content */}
          <div className="col-md-8">
            <div className="blog-post">
              <img
                src={`http://localhost:1000/${blogData.imageUrl}`}
                alt="Travel Blog"
                height="400px"
              />
              <div className="post-meta d-flex align-items-center mb-3">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-success"
                />
                <span>14 Jan 2024</span>
              </div>
              <h2>{blogData.title}</h2>
              <p>{blogData.content}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-4 recent-posts">
            <h4>Recent posts:</h4>
            {/* Recent Post Item */}
            {blogData ? (
              <div>
                <div className="recent-post d-flex">
                  <img
                    src={`http://localhost:1000/${blogData.imageUrl}`}
                    alt="Recent Post 1"
                  />
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faCalendarAlt} /> 02 Jan, 2024
                    </p>
                    {blogData.title}
                  </div>
                  <hr />
                </div>
                <hr />
              </div>
            ) : (
              <div>loading</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;

import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import MainBanner from "../MainBanner/MainBanner";
import { fetchBlogs } from "../../../APIs/BlogsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Shared/Pagination/Pagination";
import { Link } from "react-router-dom";
export default function Blog() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.Blogs);
  const { currentPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(fetchBlogs(currentPage));
  }, [currentPage, dispatch]);

  return (
    <>
      <MainBanner title="Blog" />

      <section className="blog">
        <div className="container ">
          <div className="row  gy-4 my-5 ">
            {blogs ? (
              blogs.map((blog) => (
                <div className="col-lg-4 col-md-6 parent" key={blog.blog_id}>
                  <div className="blogCard shadow-lg">
                    <div className="overflow-hidden">
                      <img
                        src={`http://localhost:1000/${blog.imageUrl}`}
                        className="blogImage"
                        alt="blogImage"
                      />
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-auto greenColor">
                          <FontAwesomeIcon icon={faCalendarDays} />
                        </div>
                        <div className="col">
                          <p className="text-secondary">March 28, 2023</p>
                        </div>
                      </div>
                      <h4 className="card-title">{blog.title}</h4>
                      <div className="row g-lg-1 gx-sm-2 mt-3">
                        <div className="col-auto card-button">
                          <Link
                            to={`/Blogdetail/${blog.blog_id}`}
                            className="greenColor"
                          >
                            Read more
                          </Link>
                        </div>
                        <div className="col greenColor">
                          <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1>no blogs found</h1>
              </div>
            )}
            <Pagination />
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../Reducers/PaginationSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.pagination);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 3) {
      dispatch(setPage(1));
    } else {
      dispatch(setPage(pageNumber));
    }
  };
  return (
    <div>
      <div className="pagination">
        <button onClick={() => handlePageChange(1)}>1</button>
        <button onClick={() => handlePageChange(2)}>2</button>
        <button onClick={() => handlePageChange(3)}>3</button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="right-arrow"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}

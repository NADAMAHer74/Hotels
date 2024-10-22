import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import Pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";

const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: Pagination,
    Blogs: Blogs,
  },
});

export default store;

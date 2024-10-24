import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import Pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
import packageReducer from '../Components/Pages/TourDetails/packageSlice.jsx';
import AboutSlice from "../Reducers/AboutSlice";

const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: Pagination,
    Blogs: Blogs,
    package: packageReducer,
    about: AboutSlice,
  },
});

export default store;

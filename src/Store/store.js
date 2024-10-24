import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import Pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
import packageReducer from '../Components/Pages/TourDetails/packageSlice.jsx';
import AboutSlice from "../Reducers/AboutSlice";
import BlogSlice from "../Reducers/BlogSlice";
import ToursSlice from "../Reducers/TourGridSlice";
const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: Pagination,
    Blogs: Blogs,
    package: packageReducer,
    about: AboutSlice,
    blog: BlogSlice,
    tours: ToursSlice,
  },
});

export default store;

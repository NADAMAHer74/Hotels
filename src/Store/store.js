import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
import home from "../Reducers/HomeSlice";
import packageReducer from "../Components/Pages/TourDetails/packageSlice.jsx";

const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: pagination,
    Blogs: Blogs,
    home: home,
    package: packageReducer,
  },
});

export default store;

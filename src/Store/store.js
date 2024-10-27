import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import Pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
// import packageReducer from '../Components/Pages/TourDetails/packageSlice.jsx';
import reducer from "../Reducers/DistinationSlice";
import packages from '../Reducers/packageSlice';
import tourReducer from "../Reducers/TourSlice";

const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: Pagination,
    Blogs: Blogs,
    package: packages,
    tours: tourReducer,
  },
});

export default store;



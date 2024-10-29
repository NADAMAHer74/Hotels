import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
import packageReducer from "../Components/Pages/TourDetails/packageSlice.jsx";

// import packageReducer from '../Components/Pages/TourDetails/packageSlice.jsx';
import AboutSlice from "../Reducers/AboutSlice";
import BlogSlice from "../Reducers/BlogSlice";
import ToursSlice from "../Reducers/TourGridSlice";
import packages from '../Reducers/packageSlice';
import tourReducer from "../Reducers/TourSlice";
import HomeSlice from "../Reducers/HomeSlice";
import AuthSlice from "../Reducers/AuthSlice";

const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: pagination,
    Blogs: Blogs,
    home: HomeSlice,
    package: packageReducer,
    about: AboutSlice,
    blog: BlogSlice,
    tours: tourReducer,
    auth: AboutSlice,

  },
});

export default store;



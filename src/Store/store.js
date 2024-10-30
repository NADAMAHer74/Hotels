import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
import home from "../Reducers/HomeSlice";

import packageReducer from "../Reducers/packageSlice";
import AboutSlice from "../Reducers/AboutSlice";

import tourReducer from "../Reducers/TourSlice";
import HomeSlice from "../Reducers/HomeSlice";
import AuthSlice from "../Reducers/AuthSlice";
import contactSlice from "../Reducers/contactSlice";
const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: pagination,
    Blogs: Blogs,
    home: HomeSlice,
    package: packageReducer,
    toursData: tourReducer,
    home: home,
    contact: contactSlice,
    about: AboutSlice,
    tours: tourReducer,
    auth: AuthSlice,
  },
});

export default store;

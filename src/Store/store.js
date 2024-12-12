



import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
import HomeSlice from "../Reducers/HomeSlice";
import packageReducer from "../Reducers/packageSlice";
import AboutSlice from "../Reducers/AboutSlice";
import tourReducer from "../Reducers/TourSlice";
import bannerReducer from "../Reducers/MainBannerSlice";
import AuthSlice from "../Reducers/AuthSlice";
import contactReducer, { contactInfoSlice } from '../Reducers/contactSlice';

const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: pagination,
    Blogs: Blogs,
    home: HomeSlice,
    package: packageReducer,
    toursData: tourReducer,
    contact: contactReducer,            
    contactInfo: contactInfoSlice.reducer, 
    about: AboutSlice,
    banner: bannerReducer,
    tours: tourReducer,
    auth: AuthSlice,
  },
});

export default store;

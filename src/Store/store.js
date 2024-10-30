import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
import home from "../Reducers/HomeSlice";
// import packageReducer from "../Components/Pages/TourDetails/packageSlice.jsx";
// import packageReducer from '../Components/Pages/TourDetails/packageSlice.jsx';
// import AboutSlice from "../Reducers/AboutSlice";
// import BlogSlice from "../Reducers/BlogSlice";
// import ToursSlice from "../Reducers/TourGridSlice";
import packageReducer from '../Reducers/packageSlice';
import AboutSlice from "../Reducers/AboutSlice";
import BlogSlice from "../Reducers/BlogSlice";
// import ToursSlice from "../Reducers/TourGridSlice";
// import packages from '../Reducers/packageSlice';
import tourReducer from "../Reducers/TourSlice";
import contactReducer from '../Reducers/contactSlice';
import contactInfoSlice from '../Reducers/contactSlice';
import bannerReducer from '../Reducers/MainBannerSlice';

const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: pagination,
    Blogs: Blogs,
    package: packageReducer,
    toursData : tourReducer,
    home : home,
    contact: contactReducer,
    about: AboutSlice,
    contactInfo: contactInfoSlice,
    banner: bannerReducer,


  },
});

export default store;



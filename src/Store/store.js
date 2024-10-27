import { configureStore } from "@reduxjs/toolkit";
import DistinationSlice from "../Reducers/DistinationSlice";
import pagination from "../Reducers/PaginationSlice";
import Blogs from "../Reducers/BlogsSlice";
<<<<<<< HEAD
import home from "../Reducers/HomeSlice";
import packageReducer from "../Components/Pages/TourDetails/packageSlice.jsx";

=======
import packageReducer from '../Components/Pages/TourDetails/packageSlice.jsx';
import AboutSlice from "../Reducers/AboutSlice";
import BlogSlice from "../Reducers/BlogSlice";
import ToursSlice from "../Reducers/TourGridSlice";
>>>>>>> 1d9fca30c16012dedb5efe0a9689f91430e9cc9d
const store = configureStore({
  reducer: {
    distination: DistinationSlice,
    pagination: pagination,
    Blogs: Blogs,
    home: home,
    package: packageReducer,
    about: AboutSlice,
    blog: BlogSlice,
    tours: ToursSlice,
  },
});

export default store;

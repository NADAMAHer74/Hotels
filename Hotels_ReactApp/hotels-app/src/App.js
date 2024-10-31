import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import TourDetail from "./Components/Pages/TourDetails/TourDetail";
import BlogDetail from "./Components/Pages/BlogDetails/BlogDetails";
import Home from "./Components/Pages/Home/Home";
import Destination from "./Components/Pages/Destination/Destination";
import Blog from "./Components/Pages/Blog/Blog";
import Contact from "./Components/Pages/Contact/Contact";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import About from "./Components/Pages/About/About";
import TourGrid from "./Components/Pages/TourGrid/TourGrid";
import { useEffect, useState } from "react";
import Preloader from "./Components/Shared/Preloader/Preloader";

function App() {

  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/tourgrid" element={<TourGrid />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tourdetail/:id" element={<TourDetail />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/Blogdetail/:id" element={<BlogDetail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

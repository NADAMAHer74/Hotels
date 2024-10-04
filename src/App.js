import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import TourDetail from "./Components/Pages/TourDetails/TourDetail";
import BlogDetail from "./Components/Pages/BlogDetails/BlogDetails";
import Home from "./Components/Pages/Home/Home";
import Destination from "./Components/Pages/Destination/Destination";
import Blog from "./Components/Pages/Blog/Blog";
import Contact from "./Components/Pages/Contact/Contact";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/Pages/About/About";
import TourGrid from "./Components/Pages/TourGrid/TourGrid";
// import MainBanner from "./Components/Pages/MainBanner/MainBanner";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path=" " element={<Home />} />

          <Route path="/tourgrid" element={<TourGrid />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tourdetail" element={<TourDetail />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/BlogDetail" element={<BlogDetail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import logo from "./logo.svg";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import TourDetail from "./Components/Pages/TourDetails/TourDetail";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainBanner from "./Components/Pages/MainBanner/MainBanner";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* <Route path='/' exact element={<Home/>}/>
      <Route path='/blod' element={<Blog/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/> */}
          <Route path="/tourdetail" element={<TourDetail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

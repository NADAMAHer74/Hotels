// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTours } from "../../../APIs/TourGridApi";
// import { Link } from "react-router-dom";
// import './style.css';
// import Pagination from "../../Shared/Pagination/Pagination";

// const TourGrid = () => {
//   const dispatch = useDispatch();
//   const tours  = useSelector((state) => state.toursData.tours);
//   const { currentPage } = useSelector((state) => state.pagination);

//   useEffect(() => {
//     dispatch(fetchTours(currentPage));
//   }, [dispatch, currentPage]);

//   return (
//     <div className="tourGridContainer">
//       {tours && tours.length > 0 ? (
//         <div className="tourGrid">
//           {tours.map((tour) => (
//             <Link
//                   key={tour.tour_id}
//                   to={{
//                     pathname: `/tourdetail/${tour.tour_id}`,
//                     state: {
//                       tourImage: tour.tourImage,
//                       adultPrice: tour.adultPrice,
//                       kidsPrice: tour.kidsPrice,
//                       childrenPrice: tour.childrenPrice
//                     }
//                   }}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >

//               <div className="tourCard">
//                 <img
//                   className="cardImgTop"
//                   src={`http://localhost:1000/${tour.tourImage}`}
//                   alt={tour.name}
//                 />
//                 <div className="cardOverlay">
//                   <div className="tagContainer">
//                     <span className="bestSellerTag">Best Seller</span>
//                     <span className="newTag">New</span>
//                   </div>
//                   <h5 className="cardTitle">{tour.name}</h5>
//                   <p className="cardLocation">{tour.location}</p>
//                   <div className="cardFooter">
//                     <span className="cardPrice">From ${tour.adultPrice}</span>
//                     <span className="cardRating">
//                       <i className="fa fa-star cardRatingIcon"></i>
//                       {tour.rating} ({tour.reviews} reviews)
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <p>No tours found.</p>
//       )}
//       <Pagination />
//     </div>
//   );
// };

// export default TourGrid;

// import React from "react";
// import {Container, Row, Col, Card, Badge } from "react-bootstrap";
// import img1 from "../../../images/person1.jpg";
// import img2 from "../../../images/person1.jpg";
// import img3 from "../../../images/person1.jpg";
// import img4 from "../../../images/person1.jpg";
// import img5 from "../../../images/person1.jpg";
// import img6 from "../../../images/person1.jpg";
// import MainBanner from "../MainBanner/MainBanner";

// import "./style.css";

// const CardComponent = ({ imgSrc, location, title, price }) => (
//   <Card className="mb-4">
//     <Card.Img className="cardImgTop" variant="top" src={imgSrc} alt={title} />
//     <div className="cardOverlay">
//       <div className="d-flex">
//         <span className="discountBadge badge">10% off</span>
//         <span className="featuredBadge ml-2 badge">Featured</span>
//       </div>
//       <div className="address">
//         <p className="textOfCard">
//           <i
//             className="fa-solid fa-location-dot"
//             style={{ color: "#0ced63" }}
//           ></i>{" "}
//           {location}
//         </p>
//         <h5 className="cardTitle">{title}</h5>
//       </div>
//       <div>
//         <span className="newPrice">
//           <i
//             className="fa-solid fa-dollar-sign"
//             style={{ color: "#0ced63" }}
//           ></i>{" "}
//           {price}
//         </span>
//         <span className="price">{price}</span>
//       </div>
//     </div>
//   </Card>
// );

// const Tourgrid = () => {
//   const cardData = [
//     {
//       imgSrc: img1,
//       location: "Trafford Park Lexington 40507",
//       title: "Cuba Sailing Adventure",
//       price: "$116.10",
//     },
//     {
//       imgSrc: img2,
//       location: "Trafford Park Lexington 40507",
//       title: "Cuba Sailing Adventure",
//       price: "$116.10",
//     },
//     {
//       imgSrc: img3,
//       location: "Trafford Park Lexington 40507",
//       title: "Cuba Sailing Adventure",
//       price: "$116.10",
//     },
//     {
//       imgSrc: img4,
//       location: "Trafford Park Lexington 40507",
//       title: "Cuba Sailing Adventure",
//       price: "$116.10",
//     },
//     {
//       imgSrc: img5,
//       location: "Trafford Park Lexington 40507",
//       title: "Cuba Sailing Adventure",
//       price: "$116.10",
//     },
//     {
//       imgSrc: img6,
//       location: "Trafford Park Lexington 40507",
//       title: "Cuba Sailing Adventure",
//       price: "$116.10",
//     },
//   ];

//   return (
//     <>
//       <MainBanner title="Tour Grid" />

//       <Container className="my-5">
//         <Row>
//           {cardData.map((card, index) => (
//             <Col md={4} key={index}>
//               <CardComponent
//                 imgSrc={card.imgSrc}
//                 location={card.location}
//                 title={card.title}
//                 price={card.price}
//               />
//             </Col>
//           ))}
//         </Row>
//         <div className="pagination">
//           <ul>
//             <li>
//               <a href="#">1</a>
//             </li>
//             <li>
//               <a href="#">2</a>
//             </li>
//             <li>
//               <a href="#">3</a>
//             </li>
//             <li>
//               <a href="#" className="next">
//                 →
//               </a>
//             </li>
//           </ul>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Tourgrid;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours } from "../../../APIs/TourGridApi";
import { Link } from "react-router-dom";
import "./style.css";
import Pagination from "../../Shared/Pagination/Pagination";
import MainBanner from "../MainBanner/MainBanner";

const TourGrid = () => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.toursData.tours);
  const { currentPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(fetchTours(currentPage));
  }, [currentPage, dispatch]);

  return (
    <>
      <MainBanner title="Tour Grid" />
      <div className="container my-5">
        <div className="row">
          {tours && tours.length > 0 ? (
            <div className="tourGrid mt-5">
              {tours.map((tour) => (
                <Link
                  key={tour.tour_id}
                  to={{
                    pathname: `/tourdetail/${tour.tour_id}`,
                    state: {
                      tourImage: tour.tourImage,
                      adultPrice: tour.adultPrice,
                      kidsPrice: tour.kidsPrice,
                      childrenPrice: tour.childrenPrice,
                      location: tour.location,
                      name: tour.name,
                      languagesSupport: tour.languagesSupport,
                      maxGusts: tour.maxGusts,
                      miniAge: tour.miniAge,
                    },
                  }}
                  className="tourLink "
                >
                  <div
                    key={tour.tour_id}
                    className="card tourCard col-lg-4 col-md-6 col-sm-12 mb-4"
                  >
                    <img
                      className="cardImgTop"
                      src={`http://localhost:1000/${tour.tourImage}`}
                      alt={tour.name}
                    />
                    <div className="cardOverlay">
                      <div className="d-flex">
                        <span className="discountBadge">10% off</span>
                        <span className="featuredBadge">Featured</span>
                      </div>
                      <div className="address">
                        <p className="textOfCard">
                          <i
                            className="fa-solid fa-location-dot"
                            style={{ color: "#0ced63" }}
                          ></i>{" "}
                          {tour.location}
                        </p>
                        <h5 className="cardTitle">{tour.name}</h5>
                      </div>
                      <div className="priceContainer">
                        <span className="newPrice">${tour.adultPrice}</span>
                        <span className="price">${tour.adultPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No tours found.</p>
          )}
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default TourGrid;

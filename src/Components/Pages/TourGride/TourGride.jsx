import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import img1 from "../../../images/person1.jpg";
import img2 from "../../../images/person1.jpg";
import img3 from "../../../images/person1.jpg";
import img4 from "../../../images/person1.jpg";
import img5 from "../../../images/person1.jpg";
import img6 from "../../../images/person1.jpg";
import "./style.css";

const CardComponent = ({ imgSrc, location, title, price }) => (
  <Card className="mb-4">
    <Card.Img variant="top" src={imgSrc} alt={title} />
    <div className="card-overlay">
      <div className="d-flex">
        <span className="discount-badge badge">10% off</span>
        <span className="featured-badge ml-2 badge">Featured</span>
      </div>
      <div className="address">
        <p className="textOfCard">
          <i
            className="fa-solid fa-location-dot"
            style={{ color: "#0ced63" }}
          ></i>{" "}
          {location}
        </p>
        <h5 className="card-title">{title}</h5>
      </div>
      <div>
        <span className="new-price">
          <i
            className="fa-solid fa-dollar-sign"
            style={{ color: "#0ced63" }}
          ></i>{" "}
          {price}
        </span>
        <span className="price">{price}</span>
      </div>
    </div>
  </Card>
);

const Tourgrid = () => {
  const cardData = [
    {
      imgSrc: img1,
      location: "Trafford Park Lexington 40507",
      title: "Cuba Sailing Adventure",
      price: "$116.10",
    },
    {
      imgSrc: img2,
      location: "Trafford Park Lexington 40507",
      title: "Cuba Sailing Adventure",
      price: "$116.10",
    },
    {
      imgSrc: img3,
      location: "Trafford Park Lexington 40507",
      title: "Cuba Sailing Adventure",
      price: "$116.10",
    },
    {
      imgSrc: img4,
      location: "Trafford Park Lexington 40507",
      title: "Cuba Sailing Adventure",
      price: "$116.10",
    },
    {
      imgSrc: img5,
      location: "Trafford Park Lexington 40507",
      title: "Cuba Sailing Adventure",
      price: "$116.10",
    },
    {
      imgSrc: img6,
      location: "Trafford Park Lexington 40507",
      title: "Cuba Sailing Adventure",
      price: "$116.10",
    },
  ];

  return (
    <>
      <Container className="my-5">
        <Row>
          {cardData.map((card, index) => (
            <Col md={4} key={index}>
              <CardComponent
                imgSrc={card.imgSrc}
                location={card.location}
                title={card.title}
                price={card.price}
              />
            </Col>
          ))}
        </Row>
        <div className="pagination">
          <ul>
            <li>
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#" className="next">
                →
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Tourgrid;

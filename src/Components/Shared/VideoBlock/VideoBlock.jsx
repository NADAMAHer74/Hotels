import React from 'react'
import './VideoBlock.css'
import rocketImg from '../../../images/inn-rocket.png'
import { Container, Row, Col } from 'react-bootstrap/'
const VideoBlock = ({ imgSrc }) => {
    return (
        <>
            <div className="videoBlock videoOverlay position-relative overflow-hidden">
                <img className="videoBackgroundImg" src={imgSrc} alt="Video Background" />
                <Container>
                    <Row className=" position-relative align-items-center position-relative z-1 ">
                        <Col xl={6} lg={7}>
                            <div className="videoContent">
                                <h3 className="videoAboutSubtitle mb-4">
                                    Ready to travel with real adventure and enjoy natural
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt.
                                </p>
                                <div className="videoBtn">
                                    <a href="contact.html" className="btn d-inline-block text-capitalize">Start Booking</a>
                                </div>
                            </div>
                        </Col>
                        <Col xl={6} lg={5}>
                            <div className="videoBlockRight position-relative d-flex align-items-center justify-content-center">
                                <div className="videoIcon">
                                    <a className="popupVideo position-relative d-inline-block text-center z-1"
                                        href="https://www.youtube.com/watch?v=8mSG40o-iJ0">
                                        <i className="fa-solid fa-play"></i>
                                    </a>
                                </div>
                                <div className="videoKite position-absolute d-none d-xxl-block">
                                    <img src={rocketImg} alt="rocket image" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default VideoBlock
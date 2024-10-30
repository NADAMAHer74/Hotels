import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MainBanner from '../MainBanner/MainBanner'
import { Container, Row, Col } from 'react-bootstrap/'
import '../About/About.css'
import VideoBlock from '../../Shared/VideoBlock/VideoBlock';
import videoBackgroundImg from '../../../images/video-bg-about.jpg'
import AuthModal from '../../Shared/AuthModal/AuthModal';
import '../../Shared/AuthModal/AuthModal.css';
import { fetchAboutImgs, fetchAboutContent, fetchAboutStats, fetchWhatWeDoImg, fetchWhatWeDo, fetchAboutServices } from '../../../APIs/AboutApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const About = () => {

  const dispatch = useDispatch();



  const aboutImgs = useSelector(
    (state) => state.about.aboutUsImgs
  )
  const aboutContent = useSelector(
    (state) => state.about.aboutUsContent
  )
  const aboutStats = useSelector(
    (state) => state.about.aboutUsStats
  )
  const whatWeDoImg = useSelector(
    (state) => state.about.whatWeDoImg
  )
  const whatWeDo = useSelector(
    (state) => state.about.whatWeDo
  )
  const aboutServices = useSelector(
    (state) => state.about.aboutServices
  )
  useEffect(() => {
    dispatch(fetchAboutImgs());
    dispatch(fetchAboutContent());
    dispatch(fetchAboutStats());
    dispatch(fetchWhatWeDoImg());
    dispatch(fetchWhatWeDo());
    dispatch(fetchAboutServices());
  }, [dispatch]);


  return (
    <>
      <MainBanner title="About Us" />
      <div className="about">
        <Container>
          <Row className='align-items-center'>
            <Col xl={6} lg={6}>
              <div
                className="aboutThumbWrap d-sm-flex align-items-center justify-content-center justify-content-lg-end"
                key={aboutImgs.AboutUsImages_ID}
              >
                <div className="aboutThumbBox d-flex flex-column">
                  {aboutImgs.map((aboutImgData, index) => (
                    aboutImgData.visible === 1 && (index <= 1) && ( // Only render if visible is 1
                      <div className={`aboutThumb${index + 1} text-center text-sm-end`} key={aboutImgData.AboutUsImages_ID}>
                        <img src={`http://localhost:1000/${aboutImgData.Image}`} alt={`About`} />
                      </div>
                    )))}
                </div>
                <div className="aboutThumbSingle text-center text-sm-start">
                  {aboutImgs.map((aboutImgData, idx) => (
                    aboutImgData.visible === 1 && (idx === 2) && ( // Only render if visible is 1 and index is 2
                      <img key={aboutImgData.AboutUsImages_ID} src={`http://localhost:1000/${aboutImgData.Image}`} alt={`About`} />
                    )))}
                </div>
              </div>
            </Col>
            <Col xl={6} lg={6}>
              <div className="aboutTitleBox">
                <span className="aboutTitle text-capitalize d-inline-block">About Us</span>
                <h2 className="aboutsubtitle">{aboutContent.head}</h2>
                <p>{aboutContent.Body}</p>
              </div>

              <div className="aboutCounterBox" >
                <Row >

                  {aboutStats.map((stat) => (
                    <Col xl={4} lg={4} md={4} sm={4} key={stat.Statistics_ID} >
                      <div className="aboutCounterText" >
                        <h3 className="aboutCounterNumber">
                          <b>{stat.Quantity}</b>
                          +
                        </h3>
                        <p>{stat.Name}</p>
                      </div>
                    </Col>
                  ))}
                </Row>

              </div>

              <div className="discoverBtn d-inline-block text-capitalize">
                <a href="" className="btn">
                  <span>Discover More <svg width="17" height="14" viewBox="0 0 17 14" fill="none"
                    xmlns="http://www.w3.org/1000/svg">
                    <path d="M11 1.24023L16 7.24023L11 13.2402" stroke="currentcolor"
                      strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                      strokeLinejoin="round"></path>
                    <path d="M1 7.24023H16" stroke="currentcolor" strokeWidth="1.5"
                      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
                    </path>
                  </svg>
                  </span>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <VideoBlock imgSrc={videoBackgroundImg} />
      <div className="chooseUs">
        <Container>
          <Row className="align-items-center">
            <Col xl={7} lg={7}>
              <div className="chooseUsContent position-relative">
                <div className="chooseUsTitleBox">
                  <span className="d-inline-block text-capitalize">What we do</span>
                  <h3 className="chooseUsTitle">
                    {/* We Arrange the Best Tour
                    <br />
                    Ever Possible */}
                    {whatWeDo.Head}
                  </h3>
                  <p>{whatWeDo.Body}</p>
                </div>
              </div>
              <Row>
                {aboutServices.map((service, index) =>
                  // Only render a new column for every two services
                  index % 2 === 0 ? (
                    <Col xl={6} lg={6} md={6} sm={6} key={index} >
                      <div className="aboutService" >
                        <div className="aboutServiceIcon">
                          <span>
                            <img src={`http://localhost:1000/${service.Icon}`} width="50" height="50" alt="" />
                          </span>
                        </div>
                        <div className="aboutServiceDescription">
                          <h3 className="aboutServiceTitle">{service.Head}</h3>
                          <p>{service.Body}</p>
                        </div>
                      </div>

                      {/* Check if the next service exists and render it within the same column */}
                      {aboutServices[index + 1] && (
                        <div className="aboutService" >
                          <div className="aboutServiceIcon">
                            <span>
                              <img src={`http://localhost:1000/${aboutServices[index + 1].Icon}`} width="50" height="50" alt="" />
                            </span>
                          </div>
                          <div className="aboutServiceDescription">
                            <h3 className="aboutServiceTitle">{aboutServices[index + 1].Head}</h3>
                            <p>{aboutServices[index + 1].Body}</p>
                          </div>
                        </div>
                      )}
                    </Col>
                  ) : null // Skip rendering for odd indexes, as they are handled within the previous column
                )}
              </Row>
            </Col>

            {whatWeDoImg.map((img) => (
              <Col xl={5} lg={5} key={img.WhatToDoImage_ID}>
                <div className="chooseUsThumbImg position-relative ">
                  <div className="chooseUsThumb text-center text-lg-end">
                    <img src={`http://localhost:1000/${img.Image}`} alt="Woman in the coast" />
                  </div>
                </div>
              </Col>
            ))}

          </Row>

        </Container>
      </div>
    </>
  )
}

export default About
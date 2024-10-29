import React from 'react'
import Login from '../Login/Login';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import { Modal, Button, ModalTitle } from 'react-bootstrap';
import logo from '../../../images/logo.png'
import Signup from '../Signup/Signup';

const AuthModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);




    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setIsLogin(true);
        setShowModal(true);
    }

    const switchForm = () => setIsLogin(!isLogin);

    return (
        <>
            <Link className="registrationBtn" onClick={() => { setIsLogin(true); handleShow(); }}>
                <FontAwesomeIcon icon={faCircleUser} />
                <span>Sign In</span>
            </Link>
            {/* <Button variant="primary" onClick={() => { setIsLogin(true); handleShow(); }}>
                Login
            </Button> */}

            {/* Login Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <img src={logo} alt="" />
                </Modal.Header>
                <Modal.Body>
                    {isLogin ? <Login /> : <Signup />}
                </Modal.Body>
                <Modal.Footer>
                    <p className="switch-text m-auto">

                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <span onClick={switchForm} style={{ color: '#11bb67', cursor: 'pointer' }}>
                            {!isLogin ? ' Log in' : ' Sign up'}
                        </span>
                    </p>
                </Modal.Footer>
            </Modal>
            {/* Signup Modal */}

        </>
    )
}

export default AuthModal

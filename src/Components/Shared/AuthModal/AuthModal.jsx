import React from 'react'
import Login from '../Login/Login';
import { useState } from 'react';
import { Modal, Button, ModalTitle } from 'react-bootstrap';
import logo from '../../../images/logo.png'
import Signup from '../Signup/Signup';

const AuthModal = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);

    return (
        <>
            <Button variant="primary" onClick={handleShowLogin}>
                Login
            </Button>
            <Button variant="secondary" onClick={handleShowSignup}>
                Sign Up
            </Button>
            {/* Login Modal */}
            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <img src={logo} alt="" />
                </Modal.Header>
                <Modal.Body>
                    <Login />
                </Modal.Body>
                {/*                 <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogin}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
            {/* Signup Modal */}
            <Modal show={showSignup} onHide={handleCloseSignup}>
                <Modal.Header closeButton>
                    <img src={logo} alt="" />
                </Modal.Header>
                <div className="modal-text">
                    <h4>Welcome back!</h4>
                    <span>Please enter your details to sign in</span>
                </div>
                <Modal.Body>
                    <Signup />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AuthModal

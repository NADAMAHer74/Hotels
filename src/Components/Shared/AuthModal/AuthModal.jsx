import React from 'react'
import Login from '../Login/Login';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, ModalTitle, Dropdown, DropdownMenu } from 'react-bootstrap';
import logo from '../../../images/logo.png'
import Signup from '../Signup/Signup';
import { useEffect } from 'react';
import { logout } from '../../../Reducers/AuthSlice';
import '../AuthModal/AuthModal.css'
 
const AuthModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
 
    const dispatch = useDispatch();
 
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
 
 
    const handleLogout = () => {
        dispatch(logout());
    }
 
    useEffect(() => {
        if (token) {
            handleClose();
        }
    }, [token]);
 
    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setIsLogin(true);
        setShowModal(true);
    }
 
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    const switchForm = () => setIsLogin(!isLogin);
 
/*     <span className="registrationBtn username">{`${user.firstName} ${user.lastName}`}</span>
 */    return (
        <>
            {token && user ? (
                <Dropdown className='profileBtn '>
 
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {`${user.firstName} ${user.lastName}`}
                    </Dropdown.Toggle>
                    <DropdownMenu>
                        <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                    </DropdownMenu>
                </Dropdown>
 
            ) : (
                <Link className="registrationBtn" onClick={() => { setIsLogin(true); handleShow(); }}>
                    <FontAwesomeIcon icon={faCircleUser} />
                    <span>Sign In</span>
                </Link>
            )}
 
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
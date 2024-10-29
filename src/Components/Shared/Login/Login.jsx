import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../../../images/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../../APIs/AuthApi';
import '../Login/Login.css'

const Login = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);




    const handleLogin = (e) => {
        e.preventDefault();



        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError((prevError) => ({ ...prevError, email: 'Please enter a valid email address.' }));
            return;
        }

        if (password.length < 8) {
            setError((prevError) => ({ ...prevError, password: 'Password must be at least 6 characters long.' }));
            return;
        }


        console.log({ email, password });
        // Handle login logic here
        dispatch(signInUser({ email, password }));
        setEmail('');
        setPassword('')
        setFormSubmitted(true);
    };

    return (
        <div>
            <Form onSubmit={handleLogin}>
                {auth.loading && <p>Loading...</p>}
                {auth.error && <Alert variant='danger'>{auth.error}</Alert>}
                {formSubmitted && <Alert variant='success'>Login Successful!</Alert>}
                <Row>
                    <Form.Label htmlFor="loginEmail">Email</Form.Label>
                    <Form.Control
                        id="loginEmail"
                        type="email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        isInvalid={!!error.email} />
                    <Form.Control.Feedback type="invalid">
                        {error.email}
                    </Form.Control.Feedback>
                </Row>
                <Row className='mt-2'>
                    <Form.Label htmlFor="loginPassword">Password</Form.Label>
                    <Form.Control
                        id="loginPassword"
                        type="password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        isInvalid={!!error.password} />
                    <Form.Control.Feedback type="invalid">
                        {error.password}
                    </Form.Control.Feedback>
                </Row>
                <Row className="mt-4">
                    <Col className='text-center'>
                        <Button variant="primary" className="btn rounded-pill formSubmitBtn" type="submit">
                            Log In
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Login
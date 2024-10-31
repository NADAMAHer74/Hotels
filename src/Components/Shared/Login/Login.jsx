import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../../../images/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../../APIs/AuthApi';
import '../Login/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ email: '', password: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);




    const handleLogin = async (e) => {
        e.preventDefault();

        setError({ email: '', password: '' });
        setFormSubmitted(false);


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError((prevError) => ({ ...prevError, email: 'Please enter a valid email address.' }));
            return;
        }

        if (password.length < 8) {
            setError((prevError) => ({ ...prevError, password: 'Password must be at least 6 characters long.' }));
            return;
        }


        try {
            await dispatch(signInUser({ email, password }));
            toast.success("Login Successful!");
            setFormSubmitted(true);
            setEmail('');
            setPassword('');
        } catch (error) {
            const errorMessage = error.message || "An error occurred during login.";
            toast.error(errorMessage);
            setFormSubmitted(false);
        }



        console.log({ email, password });
        // Handle login logic here
        /* dispatch(signInUser({ email, password }));
        setEmail('');
        setPassword('')
        setFormSubmitted(true); */
    };
    const authErrorMessage = auth.error ? (typeof auth.error === 'object' ? auth.error.message : auth.error) : null;


    return (
        <div>
            <Form onSubmit={handleLogin}>
                {auth.loading && <p>Loading...</p>}
                {authErrorMessage && <Alert variant='danger'>{authErrorMessage}</Alert>}
                {formSubmitted && !authErrorMessage && <Alert variant='success'>Login Successful!</Alert>}
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
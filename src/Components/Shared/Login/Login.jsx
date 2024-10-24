import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../../../images/logo.png";
import '../Login/Login.css'
const Login = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();
        console.log({ firstName, lastName, email, password, phone });
        // Handle login logic here

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPhone('');
    };

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center  z-1">
                <Row className='d-xl-flex d-lg-flex d-md-flex d-sm-block d-xs-block align-items-center registrationForm'>
                    <Col className='Form' xl={10} lg={10} sm={12}>
                        <h2>Your adventure begins soon!</h2>
                        <Form className='d-flex flex-column gap-2' onSubmit={handleLogin}>
                            <>
                                <Row>
                                    <Col className="p-0 pe-1">
                                        <Form.Label htmlFor="firstName">First name</Form.Label>
                                        <Form.Control id="firstName" type="text" value={firstName} aria-label="FirstName" onChange={(e) => setFirstName(e.target.value)} />
                                    </Col>
                                    <Col className="p-0 ps-1">
                                        <Form.Label htmlFor="lastName">Last name</Form.Label>
                                        <Form.Control id="lastName" type="text" value={lastName} aria-label="LastName" onChange={(e) => setLastName(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control id="email" type="email" value={email} autoComplete="Given Email" onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
                                </Row>
                                <Row>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
                                </Row>
                                <Row>
                                    <Form.Label htmlFor="phone">Phone</Form.Label>
                                    <Form.Control id="phone" type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
                                </Row>
                                <Row className="mt-5">
                                    <Col xl={8} lg={8}>
                                        <p className="termsPolicy">
                                            By clicking the “Create Account” button, you agree to our <span>Terms of Use</span> and <span>Privacy Policy.</span>
                                        </p>
                                    </Col>
                                    <Col xl={4} lg={4}>
                                        <Button variant="primary" className="btn rounded-pill formSubmitBtn" type="submit">
                                            Create Account
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        </Form>
                        <Row>
                            <p className='redirectSignIn'>
                                Already Have an account? <span>Sign in</span>
                            </p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login
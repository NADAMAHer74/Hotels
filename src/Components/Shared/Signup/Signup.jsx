import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../../../images/logo.png";
import '../Signup/Signup.css'




const Signup = () => {


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
        <div>
            <Form>
                <>
                    <Row>
                        <Form.Label htmlFor="loginEmail">Email</Form.Label>
                        <Form.Control id="loginEmail" type="email" aria-label="Email" />
                    </Row>
                    <Row>
                        <Form.Label htmlFor="loginPassword">Password</Form.Label>
                        <Form.Control id="loginPassword" type="password" aria-label="Password" />
                    </Row>
                    <Row className="mt-4">
                        <Col xl={6} lg={6}>
                            <Button variant="primary" className="btn rounded-pill formSubmitBtn" type="submit">
                                Log In
                            </Button>
                        </Col>
                    </Row>
                </>
            </Form>
        </div>
    )
}

export default Signup

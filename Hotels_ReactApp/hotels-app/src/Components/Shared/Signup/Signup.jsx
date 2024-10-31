import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../../../images/logo.png";
import "../Signup/Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../APIs/AuthApi";

const Signup = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!firstName.trim()) newErrors.firstName = "First name is required.";

    // Last name validation
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      newErrors.email = "Please enter a valid email address.";

    // Password validation
    if (password.length < 8)
      newErrors.password = "Password must be at least 6 characters long.";

    // Phone validation
    const phoneRegex = /^\d{11}$/; // Adjust as needed
    if (!phoneRegex.test(phone))
      newErrors.phone = "Please enter a valid 11-digit phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(signUpUser({ firstName, lastName, email, password, phone }));
      console.log({ firstName, lastName, email, password, phone });
      setFormSubmitted(true);

      // Clear the form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setErrors({});
    }
  };
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center  z-1">
        <Row className="d-xl-flex d-lg-flex d-md-flex d-sm-block d-xs-block align-items-center registrationForm">
          <Col className="Form" xl={10} lg={10} sm={12}>
            <h2>Your adventure begins soon!</h2>
            <Form className="d-flex flex-column gap-2" onSubmit={handleSignup}>
              {formSubmitted && (
                <Alert variant="success">Account created successfully!</Alert>
              )}
              <>
                <Row>
                  <Col className="p-0 pe-1">
                    <Form.Label htmlFor="firstName">First name</Form.Label>
                    <Form.Control
                      id="firstName"
                      type="text"
                      value={firstName}
                      aria-label="FirstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Col>
                  <Col className="p-0 ps-1">
                    <Form.Label htmlFor="lastName">Last name</Form.Label>
                    <Form.Control
                      id="lastName"
                      type="text"
                      value={lastName}
                      aria-label="LastName"
                      onChange={(e) => setLastName(e.target.value)}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    value={email}
                    autoComplete="Given Email"
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Row>
                <Row>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Row>
                <Row>
                  <Form.Label htmlFor="phone">Phone</Form.Label>
                  <Form.Control
                    id="phone"
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-label="Phone"
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Row>
                <Row className="mt-5">
                  <Col xl={8} lg={8}>
                    <p className="termsPolicy">
                      By clicking the “Create Account” button, you agree to our{" "}
                      <span>Terms of Use</span> and <span>Privacy Policy.</span>
                    </p>
                  </Col>
                  <Col xl={4} lg={4}>
                    <Button
                      variant="primary"
                      className="btn rounded-pill formSubmitBtn"
                      type="submit"
                    >
                      Create Account
                    </Button>
                  </Col>
                </Row>
              </>
            </Form>
            <Row></Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;

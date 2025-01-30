import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import catimage from '../images/60-607569_cat-and-dog-png-no-background-description-of.png';
import logoimg from '../images/646-6464701_this-free-icons-png-design-of-dog-and.png';

function Footer() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Replace with your actual service, template, and user IDs
    const serviceID = 'service_6n7pgbj'; // Your Service ID
    const templateID = 'template_57kbbhd'; // Your Template ID
    const userID = 'ETrPlwnliHebHCVbY4x3z'; // Your User ID (API Key)

    emailjs.sendForm(serviceID, templateID, form.current, userID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Email Sent Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      });
  };

  return (
    <div className="footer-container bg-warning py-5 mt-5">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={3}>
            <Link to={'/'} className="text-decoration-none text-dark">
              <h5 className="logo"><img src={logoimg} style={{ width: "45px" }} alt="" /> Adopt A Pet</h5>
            </Link>
            <img src={catimage} style={{ width: "80%" }} alt="Adopt A Pet Logo" className="logo-image img-fluid" />
          </Col>

          <Col md={3}>
            <h4>Links</h4>
            <Link to={'/'} className="text-decoration-none text-dark d-block mb-2">Home</Link>
            <Link to={'/login'} className="text-decoration-none text-dark d-block mb-2">Login</Link>
            <Link to={'/register'} className="text-decoration-none text-dark d-block mb-2">Register</Link>
          </Col>

          <Col md={3}>
            <h4>Guides</h4>
            <a href='https://react.dev/' target='_blank' rel='noopener noreferrer' className="text-decoration-none text-dark d-block mb-2">React</a>
            <a href='https://react-bootstrap.netlify.app/' target='_blank' rel='noopener noreferrer' className="text-decoration-none text-dark d-block mb-2">React Bootstrap</a>
            <a href='https://bootswatch.com/' target='_blank' rel='noopener noreferrer' className="text-decoration-none text-dark d-block mb-2">Bootswatch</a>
          </Col>

          <Col md={3}>
            <h4>Contact us</h4>
            <Form ref={form} onSubmit={sendEmail}>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Name" name='from_name' required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter your email" name='from_email' required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={3} placeholder="Message" name='message' required />
              </Form.Group>
              <Button style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }} variant="primary" type='submit'>Submit</Button>
            </Form>

            <div className="social-icons mt-3">
              <i className="fab fa-facebook fa-2x me-3"></i>
              <i className="fab fa-linkedin fa-2x me-3"></i>
              <i className="fab fa-twitter fa-2x me-3"></i>
              <i className="fab fa-instagram fa-2x"></i>
            </div>
          </Col>
        </Row>
      </Container>
      <p className="text-center mt-3">Copyright &copy; 2024 Adopt A Pet. Built with React.</p>
    </div>
  );
}

export default Footer;

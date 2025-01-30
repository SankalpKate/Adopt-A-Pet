import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser'
import { useRef } from 'react';
import Swal from 'sweetalert2';
import catimage from '../images/60-607569_cat-and-dog-png-no-background-description-of.png'
import logoimg from '../images/646-6464701_this-free-icons-png-design-of-dog-and.png'





function Cartfooter() {

  const form = useRef();
  const sendEmail = (e) => {
    Swal.fire({
      icon: 'success',
      title: 'Email Sent Successfully',
      showConfirmButton: false,
      timer: 1500
    });




    e.preventDefault();


    emailjs.sendForm('service_s3pdj0h', 'template_57kbbhd', form.current, 'LUmjhQENdbPc6fTce')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    }
  
 

  return (
    <div className="footer-container py-5 mt-5" style={{backgroundColor:"#4b1c81"}} >
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={3}>
            <Link to={'/'} className="text-decoration-none text-light">
              <h5 className="logo"><img src={logoimg} style={{width:"45px"}} alt="" /> Pet Nest</h5>
            </Link>
            <img src={catimage} style={{width:"80%"}} alt="Pet Nest Logo" className="logo-image img-fluid" />
          </Col>

          <Col md={3}>
            <h4 style={{color:"white"}}>Links</h4>
            <Link to={'/'} className="text-decoration-none text-light d-block mb-2">Home</Link>
            <Link to={'/login'} className="text-decoration-none text-light d-block mb-2">Login</Link>
            <Link to={'/register'} className="text-decoration-none text-light d-block mb-2">Register</Link>
          </Col>

          <Col md={3}>
            <h4 style={{color:"white"}}>Guides</h4>
            <a href='https://react.dev/' target='_blank' rel='noopener noreferrer' className="text-decoration-none text-light d-block mb-2">React</a>
            <a href='https://react-bootstrap.netlify.app/' target='_blank' rel='noopener noreferrer' className="text-decoration-none text-light d-block mb-2">React Bootstrap</a>
            <a href='https://bootswatch.com/' target='_blank' rel='noopener noreferrer' className="text-decoration-none text-light d-block mb-2">Bootswatch</a>
          </Col>

          <Col md={3}>
            <h4 style={{color:"white"}}>Contact us</h4>
            <Form ref={form} onSubmit={sendEmail}>

            <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Name" name='from_name' />

            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Enter your email" name='from_email' />

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Message" name='message'  />
            </Form.Group>
            <Button className='bg-warning text-black' style={{ borderColor: "#ffc107", borderRadius: "20px" }} variant="primary" type='submit' >Submit</Button>

            </Form>
            
            <div style={{color:"white"}} className="social-icons mt-3">
              <i className="fab fa-facebook fa-2x me-3"></i>
              <i className="fab fa-linkedin fa-2x me-3"></i>
              <i className="fab fa-twitter fa-2x me-3"></i>
              <i className="fab fa-instagram fa-2x"></i>
            </div>
          </Col>
        </Row>
      </Container>
      <p style={{color:"white"}}  className="text-center mt-3">Copyright &copy; 2024 Pet Nest. Built with React.</p>
    </div>
  );
}

export default Cartfooter;

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import headerimage from '../images/8458719_3865689-02.jpeg.jpg';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';


function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <header style={{ position: 'relative' }}>
        <img src={headerimage} alt="Header" style={{ width: '100%', height: '100vh' }} />
        <div className="button-container" style={{ position: 'absolute', bottom: '50px', left: '100px', textAlign: 'center' }}>
          <Link to='/main'>
            <Button style={{
              fontFamily: '"Signika negative", sans-serif',
              fontWeight:"700",
              backgroundColor: "#fbab05",
              borderColor: "#fbab05",
              borderRadius: "25px",
              fontSize: "40px"
            }}>
              ADOPT NOW
            </Button>

          </Link>
        </div>
      </header>
      <Container className='mt-5'>
        <Row>
          <Col>
            <img src="//dm6g3jbka53hp.cloudfront.net/static-images/adopt-me-pet-02032021.jpg"
              alt="" className="img-fluid" />
          </Col>
          <Col xs={12} md={6}>
            <div className='mt-5'>
              <h2 >WELCOME TO, Adopt A Pet</h2>
              <p>Adopt A Pet, your ultimate destination for finding your perfect furry companion! At Adopt A Pet, we're dedicated to connecting loving pet seekers with animals in need of forever homes. Our user-friendly platform features a diverse range of profiles, each showcasing adorable pets waiting to be adopted. Whether you're searching for a playful pup, a cuddly cat, or a charming small animal, Adopt A Pet has you covered. Our comprehensive search filters allow you to narrow down your options based on preferences such as species, breed, age, and location, making it easier than ever to find your ideal match. With detailed descriptions, captivating photos, and helpful information about each pet's personality and background, you can make an informed decision about your new family member. Adopt A Pet is not just a website; it's a community dedicated to promoting responsible pet ownership and spreading love and compassion to animals in need. Join us today in giving a forever home to a deserving pet!</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default Home;

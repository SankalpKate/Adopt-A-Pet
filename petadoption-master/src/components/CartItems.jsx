import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { BASE_URL } from '../services/baseURL';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import '../components/cartItems.css';
import { useDispatch } from 'react-redux';
import { addToInfo, addToWishlist } from '../redux/savedSlice';
import { addToCheckout } from '../redux/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import cartimg from '../images/shopping-bag.png'
import heartimg from '../images/heart (1).png'


function CartItems({ product, isLoggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHeartClicked, setHeartClicked] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (isLoggedIn) {
      setShow(true);
    } else {
      navigate('/login');
    }
  };

  const toggleHeart = () => {
    setHeartClicked(!isHeartClicked);
  };



  const addToCart = () => {
    dispatch(addToCheckout(product));
    Swal.fire({
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const addtoWishlist = () => {
    dispatch(addToWishlist(product));
    Swal.fire({
      icon: 'success',
      title: 'Added to Wishlist!',
      showConfirmButton: false,
      timer: 1500
    });
    setHeartClicked(true);
  };




  return (
    <div>
      <Container>
        <Row className='col-md-12 ms-2 mt-3'>
          <Col>
            <Card className="h-80 d-flex flex-column position-relative" style={{ height: "355px" }}>

              <Card.Img
                variant="top"
                onClick={handleShow}
                src={`${BASE_URL}/uploads/${product.productimage}`}
                style={{ objectFit: 'cover', height: '65%' }}
              />
              <div className="position-absolute top-0 end-0 mt-2 me-2" onClick={toggleHeart}>
                {isHeartClicked ? (
                  <i className="fa fa-heart" style={{ color: 'red', fontSize: "23px", cursor: "pointer" }}></i>
                ) : (
                  <i className="far fa-heart" onClick={() => dispatch(addToWishlist(product))} style={{ color: 'black', fontSize: "23px", cursor: "pointer" }}></i>
                )}
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center" style={{ fontFamily: '"Signika negative", sans-serif' }}>₹{product.productprice}</Card.Title>
                <Card.Text className="text-center" style={{ fontWeight: "300" }}>{product.productname}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose} size="lg" dialogClassName='custom-name'>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col md={4}>
                  <img className='mr-4' src={`${BASE_URL}/uploads/${product.productimage}`} alt="Product" style={{ width: '110%' }} />
                </Col>
                <Col md={8}>
                  <h3>{product.productname}</h3>
                  <p style={{ fontFamily: '"Signika negative", sans-serif' }}>Price: ₹{product.productprice}</p>
                  <Button  onClick={addtoWishlist} variant="outline-danger" style={{ borderRadius: "25px" }}><i className="fa fa-heart" style={{  fontSize: "20px", cursor: "pointer" }}></i> Wishlist</Button>

                  <Button className='ms-3' variant="primary" onClick={addToCart} style={{ borderRadius: "25px" }}> <img className='mb-1' src={cartimg} style={{ width: "20px" }} alt="" /> Add to Cart</Button>



                  <hr />
                  <h5>Description:</h5>
                  <p>{product.productinfo}</p>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default CartItems;

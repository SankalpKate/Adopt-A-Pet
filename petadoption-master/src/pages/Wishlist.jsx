import React from 'react'
import logo from '../images/Colored Pet Shop Collie Dog.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Col, Row, Container, Card } from 'react-bootstrap';
import { BASE_URL } from '../services/baseURL';
import { useState } from 'react';
import { removeFromCart } from '../redux/savedSlice';
import nolistimg from '../images/cute-cat-bring-fish-with-trolley-cartoon-vector-icon-illustration-animal-nature-icon-isolated_138676-6068-removebg-preview.png'

function Wishlist() {

    const savedlistCart = useSelector((state) => state.savedListReducer);
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            <nav className="navbar" style={{ backgroundColor: "#4b1c81" }}>
                <div className="container-fluid">
                    <img src={logo} width={"55px"} alt="" />
                    



                </div>
            </nav>

            <div className='mt-3 ms-3'>
                <Link to={'/cart'} style={{ textDecoration: "none", color: "black" }}>
                    <button className='me-2 btn btn-success' style={{ borderRadius: "20px", backgroundColor: "#4b1c81", borderColor: "#4b1c81" }}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    Back To Home
                </Link>

            </div>

            <div className='row'>
                {savedlistCart?.length > 0 ? (
                    savedlistCart.map((product) => (
                        <div className='col-md-3'>
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
                                            <div className="position-absolute top-0 end-0 mt-2 me-2" >
                                        
                                                    <i className="fa fa-heart" onClick={() => dispatch(removeFromCart(product._id))} style={{ color: 'red', fontSize: "23px", cursor: "pointer" }}></i>
                                
        
                                    
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
                                                    <p style={{ fontFamily: '"Signika negative", sans-serif' }}>Price: {product.productprice}</p>
                                                    <Button variant="primary" style={{ borderRadius: "25px" }}>Add to Cart</Button>
                                                    <Button className='ms-3' style={{ borderRadius: "25px" }} variant="success">Buy Now</Button>
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


                    ))) : (
                        <div>
          <img src={nolistimg} alt="" style={{ width: '300px', display: 'block', margin: 'auto' }} />
          <h3 className='text-danger mt-4' style={{ width: '400px', margin: 'auto', textAlign: 'center'}} >No list to show</h3>

          </div>
                )
                }



            </div>






        </div>
    )
}

export default Wishlist
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseURL';
import { Button } from 'react-bootstrap';
import { removeFromWishlist } from '../redux/savedSlice';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import loadingimg from '../images/cats and dog.png'


function Fav() {
  const savedlistItems = useSelector((state) => state.savedListReducer);
  const dispatch = useDispatch();
  const [showModalForItemId, setShowModalForItemId] = useState(null);

  const handleClose = () => setShowModalForItemId(null);
  const handleShow = (itemId) => setShowModalForItemId(itemId);

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#fbab05" }}>
        <div className="container-fluid">
          <a className="navbar-brand"><i className="fas fa-paw me-2"></i>Adopt A Pet</a>
          <form className="d-flex me-auto ms-5" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: "15px" }} />
            <button className="btn btn-success" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }} type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </nav>
      <div className='mt-3 ms-3'>
        <Link to={'/main'} style={{ textDecoration: "none", color: "black" }}>
          <button className='me-2 btn btn-success' style={{ borderRadius: "20px", backgroundColor: "#4b1c81", borderColor: "#4b1c81" }}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          Back To Home
        </Link>

      </div>


      <Row className='mt-4'>
        {savedlistItems?.length > 0 ? (
          savedlistItems.map((project) => (
            <div className="col-md-6" style={{ width: "550px" }} key={project._id}>
              <div className="card mb-3 ms-5" >
                <div className="row g-0">
                  <div className="col-md-4">
                    <div style={{ height: "100%", width: "115%" }}>
                      <img src={`${BASE_URL}/uploads/${project.image}`} className="card-img-top h-100 w-110" alt="..." />
                    </div>
                  </div>
                  <div className="col-md-6 ms-2">
                    <div className="card-body ms-3">
                      <div className="d-flex justify-content-end mb-2" >
                        <i className="fa fa-heart" onClick={() => dispatch(removeFromWishlist(project._id))} style={{ color: 'red', fontSize: "23px", cursor: "pointer" }}></i>
                      </div>
                      <p><span style={{ fontWeight: "bold" }}>Name:</span> {project.petname}</p>
                      <p><span style={{ fontWeight: "bold" }}>Age:</span> {project.age}</p>
                      <p><span style={{ fontWeight: "bold" }}>Breed:</span> {project.pettype}</p>
                      <p><span style={{ fontWeight: "bold" }}>Gender:</span> {project.gender}</p>
                      <p><span style={{ fontWeight: "bold" }}>Place:</span> {project.address}</p>
                      <Button className="btn" onClick={() => handleShow(project._id)} style={{ borderRadius: "20px", backgroundColor: "#4b1c81", borderColor: "#4b1c81", color: "white" }}>see more details</Button>
                    </div>
                  </div>
                </div>
              </div>
              <Modal show={showModalForItemId === project._id} onHide={handleClose} dialogClassName='custom-modal'>
                <Modal.Header closeButton>
                  <Modal.Title><h2>Hi i am, {project.petname}</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                      <p><strong>Pet Name:</strong> {project.petname}</p>
                      <p><strong>Pet Type:</strong> {project.pettype}</p>
                      <p><strong>Breed:</strong> {project.breed}</p>
                      <p><strong>Vaccinated:</strong> {project.vaccinated}</p>
                      <p><strong>Gender:</strong> {project.gender}</p>
                      <p><strong>Spayed:</strong> {project.spayed}</p>
                      <p><strong>Age:</strong> {project.age}</p>
                      <p><strong>Info:</strong> {project.info}</p>
                      <p><strong>Owner:</strong> {project.username}</p>
                      <p><strong>Place:</strong> {project.address}</p>
                      <p><strong>Phone:</strong> {project.phone}</p>
                      <p><strong>Email:</strong> {project.email}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <img src={`${BASE_URL}/uploads/${project.image}`} alt="Project Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                  </div>
                </Modal.Body>
                
              </Modal>
            </div>
          ))
        ) : (
          <div>
          <img src={loadingimg} alt="" style={{ width: '300px', display: 'block', margin: 'auto' }} />
          <h3 className='text-danger mt-4' style={{ width: '400px', margin: 'auto', textAlign: 'center'}} >No Favourite list</h3>

          </div>
          


        )}
      </Row>
    </div>
  );
}

export default Fav;

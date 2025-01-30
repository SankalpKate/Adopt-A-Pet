import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseURL';
import '../components/Cards.css';
import { deleteProjectApi } from '../services/allAPI';


function ViewDonated({ project }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const HandleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
    const result = await deleteProjectApi(id,reqHeader)
    if(result.status===200){
        alert("Project deleted successfully")
        
    }
  }

  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card mb-3 shadow-sm rounded">
            <div className="row g-0">
              <div className="col-md-4">
                <div className="card-img-container" style={{ width: "100%", height: "100%" }}>
                  <img src={`${BASE_URL}/uploads/${project.image}`} className="card-img-top img-fluid" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem 0 0 0.5rem' }} />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-end mb-2" >
            
                      <i className="fa fa-trash" onClick={()=>HandleDelete(project._id)} style={{ color: 'red', fontSize: "23px", cursor: "pointer" }}></i>
                    
                  </div>
                  <p><span style={{ fontWeight: "bold" }}>Name:</span> {project.petname}</p>
                  <p><span style={{ fontWeight: "bold" }}>Age:</span> {project.age}</p>
                  <p><span style={{ fontWeight: "bold" }}>Breed:</span> {project.breed}</p>
                  <p><span style={{ fontWeight: "bold" }}>Gender:</span> {project.gender}</p>
                  <p><span style={{ fontWeight: "bold" }}>Place:</span> {project.address}</p>
                
                    <Button onClick={handleShow} className="btn" style={{ borderRadius: "20px", backgroundColor: "#4b1c81", borderColor: "#4b1c81", color: "white" }}>see more details</Button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} dialogClassName='custom-modal'>
        <Modal.Header closeButton>
          <Modal.Title><h1>Hi i am, {project.petname}</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <h3>Pet Information</h3>
              <p><strong>Pet Name:</strong> {project.petname}</p>
              <p><strong>Pet Type:</strong> {project.pettype}</p>
              <p><strong>Breed:</strong> {project.breed}</p>
              <p><strong>Vaccinated:</strong> {project.vaccinated}</p>
              <p><strong>Gender:</strong> {project.gender}</p>
              <p><strong>Spayed:</strong> {project.spayed}</p>
              <p><strong>Age:</strong> {project.age}</p>
              <p><strong>Info:</strong> {project.info}</p>
              <h3>Contact Information</h3>
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
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewDonated;

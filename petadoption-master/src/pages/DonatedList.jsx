import React, { useEffect, useState } from 'react'
import { userProjectApi } from '../services/allAPI';
import { Modal,Button } from 'react-bootstrap';
import { BASE_URL } from '../services/baseURL';
import { deleteProjectApi } from '../services/allAPI';
import Swal from 'sweetalert2';
import loadingimg from '../images/cute-shiba-inu-dog-super-hero-cartoon-vector-icon-illustration-animal-holiday-icon-concept-isolated_138676-7106-removebg-preview.png'
import { Link } from 'react-router-dom';


function DonatedList() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userProject, setUserProject] = useState([])
    const getUserProject = async()=>{
        const token = sessionStorage.getItem("token");
        const reqHeader ={
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await userProjectApi(reqHeader)
        console.log("==inside the project===");
        console.log(result.data);
        setUserProject(result.data)
    }
    useEffect(()=>{
        getUserProject();
    },[])

    const HandleDelete = async(id)=>{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result = await deleteProjectApi(id,reqHeader)
        if(result.status===200){
            Swal.fire({
                icon: 'success',
                title: 'Deleted Successfully!',
                showConfirmButton: false,
                timer: 1500
              });

            getUserProject();
            
        }
      }
  return (
    <div>
        <nav className="navbar" style={{ backgroundColor: "#fbab05" }}>
        <div className="container-fluid">
          <a className="navbar-brand"><i className="fas fa-paw me-2"></i>Adopt A Pet</a>
          
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

      <div className='row '>
                {userProject.length > 0 ?
                    userProject.map((item) => (
                        <div className="container mt-5 col-md-6">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card mb-3 shadow-sm rounded">
            <div className="row g-0">
              <div className="col-md-4">
                <div className="card-img-container" style={{ width: "100%", height: "100%" }}>
                  <img src={`${BASE_URL}/uploads/${item.image}`} className="card-img-top img-fluid" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem 0 0 0.5rem' }} />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-end mb-2" >
            
                      <i className="fa fa-trash" onClick={()=>HandleDelete(item._id)} style={{ color: 'red', fontSize: "23px", cursor: "pointer" }}></i>
                    
                  </div>
                  <p><span style={{ fontWeight: "bold" }}>Name:</span> {item.petname}</p>
                  <p><span style={{ fontWeight: "bold" }}>Age:</span> {item.age}</p>
                  <p><span style={{ fontWeight: "bold" }}>Breed:</span> {item.breed}</p>
                  <p><span style={{ fontWeight: "bold" }}>Gender:</span> {item.gender}</p>
                  <p><span style={{ fontWeight: "bold" }}>Place:</span> {item.address}</p>
                
                    <Button onClick={handleShow} className="btn" style={{ borderRadius: "20px", backgroundColor: "#4b1c81", borderColor: "#4b1c81", color: "white" }}>see more details</Button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} dialogClassName='custom-modal'>
        <Modal.Header closeButton>
          <Modal.Title><h1>Hi i am, {item.petname}</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <h3>Pet Information</h3>
              <p><strong>Pet Name:</strong> {item.petname}</p>
              <p><strong>Pet Type:</strong> {item.pettype}</p>
              <p><strong>Breed:</strong> {item.breed}</p>
              <p><strong>Vaccinated:</strong> {item.vaccinated}</p>
              <p><strong>Gender:</strong> {item.gender}</p>
              <p><strong>Spayed:</strong> {item.spayed}</p>
              <p><strong>Age:</strong> {item.age}</p>
              <p><strong>Info:</strong> {item.info}</p>
              <h3>Contact Information</h3>
              <p><strong>Owner:</strong> {item.username}</p>
              <p><strong>Place:</strong> {item.address}</p>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Email:</strong> {item.email}</p>
            </div>
            <div style={{ flex: 1 }}>
              <img src={`${BASE_URL}/uploads/${item.image}`} alt="Project Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </div>
                    )) :
                    <div>
          <img className='mt-5' src={loadingimg} alt="" style={{ width: '300px', display: 'block', margin: 'auto' }} />
          <h3 className='text-danger mt-4' style={{ width: '400px', margin: 'auto', textAlign: 'center'}} >No list to show</h3>

          </div>
                }
            </div>

      

    </div>
  )
}

export default DonatedList
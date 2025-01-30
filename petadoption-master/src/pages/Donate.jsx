import React, { useEffect } from 'react'
import { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import dogimage from '../images/sad - Copy.png'
import Swal from 'sweetalert2';
import { addDonateAPi } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Donate() {
    const navigate = useNavigate()

    const [token,setToken]=useState("")
    const [projectDetails, setprojectDetails] = useState({
        petname: "",
        pettype: "",
        breed: "",
        vaccinated: "",
        gender: "",
        spayed: "",
        age: "",
        info: "",
        image: "",
        username: "",
        address: "",
        phone: "",
        email: ""



    })
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("====get projectdetails=====");
        const {petname,pettype,breed,vaccinated,gender,spayed,age,info,image,username,address,phone,email}=projectDetails;
        if(!petname||!pettype||!breed||!vaccinated||!gender||!spayed||!age||!info||!image||!username||!address||!phone||!email){
            Swal.fire({
                title: "Please fill the form completely!",
                icon: "error"
              });
            
        }
        else{
            //for uploading files we have to send data as formdata
            //content type is multipart/form data
            const reqBody= new FormData();
            reqBody.append('petname',petname)
            reqBody.append('pettype',pettype)
            reqBody.append('breed',breed)
            reqBody.append('vaccinated',vaccinated)
            reqBody.append('gender',gender)
            reqBody.append('spayed',spayed)
            reqBody.append('age',age)
            reqBody.append('info',info)
            reqBody.append('image',image)
            reqBody.append('username',username)
            reqBody.append('address',address)
            reqBody.append('phone',phone)
            reqBody.append('email',email)
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }


            
            const result = await addDonateAPi(reqBody,reqHeader)
            if(result.status===200){
                Swal.fire({
                    title: "Your form has been successfully submitted",
                    icon: "success"
                  });
                  handleReset()
                  navigate('/main')

            }
            else{
                Swal.fire({
                    title: (result.response.data),
                    icon: "error"
                  });
                
            }
        }
        console.log(projectDetails);
    }
    const handleReset = (e)=>{
        setprojectDetails({
            petname: "",
            pettype: "",
            breed: "",
            vaccinated: "",
            gender: "",
            spayed: "",
            age: "",
            info: "",
            image: "",
            username: "",
            address: "",
            phone: "",
            email: ""

        })

    }
    useEffect(()=>{
        setToken(sessionStorage.getItem("token"))
    })
    return (
        <>
            <Container className='shadow mt-3' style={{ backgroundColor: "#00000030", maxHeight: "1350px", maxWidth: "700px", borderRadius: "20px", padding: "40px" }}>
                <h1 className="text-center mb-4 mt-3">Donation Form <img src={dogimage} width={"8%"} alt="" /></h1>

                <Form  >
                    <h3 className='mt-5'>Pet Information</h3>

                    <Row>
                        <Col>
                            <Form.Group  className='mt-3'>
                                <Form.Label>Name of Pet</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="petName"
                                    placeholder="Enter pet name"
                                    value={projectDetails.petname}
                                    onChange={((e) => setprojectDetails({ ...projectDetails, petname: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group  className='mt-3'>
                                <Form.Label>Type of Animal</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="animalType"
                                    value={projectDetails.pettype}
                                    onChange={((e) => setprojectDetails({ ...projectDetails, pettype: e.target.value }))}

                                >
                                    <option value="">Select</option>
                                    <option value="cat">Cat</option>
                                    <option value="dog">Dog</option>
                                    <option value="other">Other</option>

                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                            <Form.Group  className='mt-3'>
                                <Form.Label>Breed</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="breed"
                                    placeholder="Enter breed"
                                    value={projectDetails.breed}
                                    onChange={((e) => setprojectDetails({ ...projectDetails, breed: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className='mt-3'>
                                <Form.Label>Vaccinated</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Yes"
                                        name="vaccinated"
                                        value="yes"
                                        checked={projectDetails.vaccinated === 'yes'}
                                        onChange={((e) => setprojectDetails({ ...projectDetails, vaccinated: e.target.value }))}

                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="No"
                                        name="vaccinated"
                                        value="no"
                                        checked={projectDetails.vaccinated === 'no'}
                                        onChange={((e) => setprojectDetails({ ...projectDetails, vaccinated: e.target.value }))}
                                    />
                                </div>
                            </Form.Group>

                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className='mt-3'>
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        value="male"
                                        checked={projectDetails.gender === 'male'}
                                        onChange={((e) => setprojectDetails({ ...projectDetails, gender: e.target.value }))}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        value="female"
                                        checked={projectDetails.gender === 'female'}
                                        onChange={((e) => setprojectDetails({ ...projectDetails, gender: e.target.value }))}
                                    />
                                </div>
                            </Form.Group>

                        </Col>

                        <Col>
                            <Form.Group mt-3>
                                <Form.Label>Neutered/Spayed</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Yes"
                                        name="spayed"
                                        value="yes"
                                        checked={projectDetails.spayed === 'yes'}
                                        onChange={((e) => setprojectDetails({ ...projectDetails, spayed: e.target.value }))}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="No"
                                        name="spayed"
                                        value="no"
                                        checked={projectDetails.spayed === 'no'}
                                        onChange={((e) => setprojectDetails({ ...projectDetails, spayed: e.target.value }))}
                                    />
                                </div>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Col>
                        <Form.Group  className='mt-3'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                as="select"
                                name="age"
                                value={projectDetails.age}
                                onChange={((e) => setprojectDetails({ ...projectDetails,  age: e.target.value }))}

                            >
                                <option value="">Select</option>
                                <option value="young">Young</option>
                                <option value="adult">Adult</option>
                                <option value="senior">Senior</option>
                                <option value="geriatric">Geriatric</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Form.Group  className='mt-3'>
                        <Form.Label>Additional Info</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="additionalInfo"
                            placeholder="Enter additional information"
                            value={projectDetails.info}
                                onChange={((e) => setprojectDetails({ ...projectDetails,  info: e.target.value }))}
                        />
                    </Form.Group>

                    <Form.Group  className='mt-3'>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control id="custom-file" type="file" label="Choose file"
                        
                        onChange={(e)=>setprojectDetails({...projectDetails,image:e.target.files[0]})}
                        />
                    
        
                    </Form.Group>
                    <h3 className='mt-5'>Contact Information</h3>
                    <Form.Group controlId="name" className='mt-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={projectDetails.username}
                                onChange={((e) => setprojectDetails({ ...projectDetails,  username: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group  className='mt-3'>
                        <Form.Label>Place</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            value={projectDetails.address}
                                onChange={((e) => setprojectDetails({ ...projectDetails,  address: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group  className='mt-3'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={projectDetails.phone}
                                onChange={((e) => setprojectDetails({ ...projectDetails,  phone: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group  className='mt-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={projectDetails.email}
                                onChange={((e) => setprojectDetails({ ...projectDetails,  email: e.target.value }))}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81", width: "200px" }}
                    onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="primary" type="submit" className="mt-3 ms-3" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81", width: "200px" }}
                    onClick={handleReset}>
                        Reset
                    </Button>
                </Form>


            </Container>

        </>
    )
}

export default Donate
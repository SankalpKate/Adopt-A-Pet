import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginpic from '../images/nmn.jpg';
import regpic from '../images/raoul-droog-yMSecCHsIBc-unsplash.jpg'
import { Form } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { loginAPi, registerAPi } from '../services/allAPI';
import Swal from 'sweetalert2';

function Auth({ register }) {
  const registerForm = register ? true : false;
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault()
    console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      Swal.fire({
        title: "Please fill the form completely!",
        icon: "error"
      });
    }
    else {
      const result = await registerAPi(userData);
      console.log(result);
      if (result.status === 200) {
        Swal.fire({
        title: "User Registered Successfully!",
        icon: "success"
      });
        setUserData({
          username: "",
          email: "",
          password: ""

        })
        navigate('/login')
      }
      else {
        Swal.fire({
          title: (result.response.data),
          icon: "error"
        });
      }
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email,password}=userData;
    if(!email || !password){
      Swal.fire({
        title: "Please fill the form completely!",
        icon: "error"
      });
    }
    else{
      const result = await loginAPi(userData);
      if(result.status===200){
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token",result.data.token);
        Swal.fire({
          title: "User logged in successfully!",
          icon: "success"
        });
        setUserData({
          username: "",
          email: "",
          password: ""

        })
        navigate('/main')


      }else{
        Swal.fire({
          title: (result.response.data),
          icon: "error"
        });

      }

    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "100vh" }}>
      <div className='w-75 container'>
        <Link to='/main' style={{ textDecoration: "none", color: "black" }}>
          <button className='me-2 btn btn-success' style={{ borderRadius: "20px", backgroundColor: "#4b1c81", borderColor: "#4b1c81" }}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          Back to Home
        </Link>
        <div className='card bg-light mt-3'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-6'>
              {
                registerForm ? <img src={loginpic} alt="" width={"90%"} /> : <img src={regpic} alt="" width={"90%"} />
              }



            </div>
            <div className='col-lg-6 col-md-6 p-3'>
              <div className='d-flex align-items-center flex-column'>
                <h2 style={{ fontSize: "25px" }}>
                  <i className="fas fa-paw me-2"></i>Pet Nest
                </h2>
                <h5>{registerForm ? "Sign Up your account" : "Sign into your account"}</h5>
                <div style={{ width: "80%" }} >
                  <Form>
                    {
                      registerForm && <TextField id="outlined-basic" label="Full Name"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}

                        variant="outlined" fullWidth


                      />
                    }

                    <TextField className='mt-3' id="outlined-basic" label="Email ID" type='email'
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}

                      variant="outlined" fullWidth


                    />
                    <TextField className='mt-3' id="outlined-basic" label="Password" type='password' variant="outlined"
                      fullWidth
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}

                      value={userData.password}

                    />
                  </Form>
                  {
                    registerForm ?
                      <div>
                        <button className='btn mt-3' onClick={handleRegister} style={{ backgroundColor: "#4b1c81", color: "white", borderColor: "#4b1c81" }}>Register</button>
                        <p className='mt-3'>Already a user? Click here to <Link style={{ textDecoration: "none" }} to='/login'>Login</Link></p>
                      </div> :
                      <div>
                        <button className='btn mt-3' onClick={handleLogin} style={{ backgroundColor: "#4b1c81", color: "white" }}>Login</button>
                        <p className='mt-3'>Don't have an account? Click here to <Link style={{ textDecoration: "none", borderColor: "#4b1c81" }} to='/register'>Register</Link></p>

                      </div>


                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

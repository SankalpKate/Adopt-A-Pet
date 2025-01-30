import React, { useContext } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/Colored Pet Shop Collie Dog.png';
import { useSelector } from 'react-redux';
import { addProjectResponseContext } from '../context/ContextShare';
import Cartfooter from '../components/Cartfooter';

function PersonalInfo() {

    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);


    const savedlistCart = useSelector((state) => state.savedListReducer);



    const openRazorpayGateway = (product) => {
        const totalPrice = addProjectResponse
        const options = {
            key: 'rzp_test_vfY9TRGMaus8oT',
            amount: totalPrice * 100, 
            currency: 'INR',
            name: 'Pet Nest',
            description: 'Payment for ' + product.productname,
            image: 'https://cdn-icons-png.flaticon.com/512/6023/6023958.png',
            handler: function(response) {
                alert('Payment successful: ' + response.razorpay_payment_id);
            }
        };
    
        try {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error occurred while creating Razorpay instance:', error);
            alert('An error occurred while processing the payment. Please try again later.');
        }
    };
    
    
    

    return (
        <>
            <nav className="navbar" style={{ backgroundColor: "#4b1c81", padding: "10px" }}>
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


            <Grid className='mt-4' container spacing={2}>
                <Grid item xs={12}>
                    <h2 className='text-center'>Delivery Address</h2>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        savedlistCart.forEach((product) => {
                            openRazorpayGateway(product);
                        });
                    }} style={{ maxWidth: '500px', margin: 'auto' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Full Name"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    placeholder="Enter your phone number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Address"
                                    name="address"
                                    placeholder="Enter your address"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="City"
                                    name="city"
                                    placeholder="Enter your city"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="State"
                                    name="state"
                                    placeholder="Enter your state"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Pincode"
                                    name="pincode"
                                    placeholder="Enter your pincode"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }} variant="contained"  type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>


            <Cartfooter/>

        </>
    );
}

export default PersonalInfo;

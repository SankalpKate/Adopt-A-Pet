import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Colored Pet Shop Collie Dog.png';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../services/baseURL';
import { removeFromCheckout } from '../redux/wishlistSlice';
import { addProjectResponseContext } from '../context/ContextShare';
import { addToInfo } from '../redux/savedSlice';
import nocart from '../images/cute-cat-crying-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector_138676-5857-removebg-preview (1).png';

function Checkout() {
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext);
    const wishlistCart = useSelector((state) => state.wishlistReducer);
    const dispatch = useDispatch();
    let totalPrice = 0;

    wishlistCart?.forEach(product => {
        const priceWithoutCommas = parseFloat(product.productprice.replace(/,/g, ''));
        totalPrice += priceWithoutCommas;
    });
    
    // Inserting totalPrice into setAddProjectResponse when totalPrice changes
    useEffect(() => {
        setAddProjectResponse(totalPrice);
    }, [totalPrice, setAddProjectResponse]);

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

            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 mt-5'>
                        <table className='table shadow border'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistCart?.length > 0 ?
                                    wishlistCart?.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{product.productname}</td>
                                            <td><img src={`${BASE_URL}/uploads/${product.productimage}`} style={{ width: "60px" }} alt="" /></td>
                                            <td style={{ fontFamily: '"Signika negative", sans-serif' }}>₹{product.productprice}</td>
                                            <td><i className='fa-solid fa-trash' style={{ cursor: "pointer", color: "red" }} onClick={() => dispatch(removeFromCheckout(product._id))}></i></td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <img src={nocart} style={{ width: "100%" }} alt="" />
                                        <td colSpan="5" className='text-danger mt-5'>No items in cart</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='col-lg-4 col-md-4 mt-5'>
                        <div className='border shadow p-3' style={{ backgroundColor: "#f9f9f9" }}>
                            <h3 className='text-primary'>Cart Summary</h3>
                            <h5>Total Number of Products: <span className='fw-bolder text-warning ms-2' style={{ fontFamily: '"Signika negative", sans-serif' }}>{wishlistCart?.length}</span></h5>
                            <h5>Total Price: <span className='fw-bolder text-warning ms-2' style={{ fontFamily: '"Signika negative", sans-serif' }}>₹{totalPrice.toFixed(2)}</span></h5>
                            <Link to='/info'>
                                <button className='btn btn-success rounded w-100 mt-3' style={{ backgroundColor: "#4b1c81", borderColor: "#4b1c81" }} onClick={() => dispatch(addToInfo(totalPrice))}>Buy it now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;

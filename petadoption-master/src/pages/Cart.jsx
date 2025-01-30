import React from 'react'
import { Link } from 'react-router-dom'
import heart from '../images/heart.png'
import kart from '../images/shopping-bag (1).png'
import CartItems from '../components/CartItems'
import { productAPI } from '../services/allAPI'
import { useEffect, useState } from 'react'
import logo from '../images/Colored Pet Shop Collie Dog.png'
import Swal from 'sweetalert2'
import loadingimg from '../images/pet-jumping-20210422 (1).gif'
import Cartfooter from '../components/Cartfooter'
import logoimg from '../images/646-6464701_this-free-icons-png-design-of-dog-and.png'
import btnadopt from '../images/adoption.png'






function Cart() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const [searchCart, setSearchCart] = useState("");

    const [mainProduct, setMainProduct] = useState([]);

    const getMainProduct = async () => {
        const result = await productAPI(searchCart);
        setMainProduct(result.data);
    };

    useEffect(() => {
        getMainProduct()
    }, [searchCart]);


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to logout?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("token");
                setIsLoggedIn(false);
                Swal.fire("Logged out!", "", "success");
            }
        });
    };


  return (
    <div>
         <nav className="navbar" style={{ backgroundColor: "#4b1c81" }}>
                <div className="container-fluid">
                <a style={{color:"white"}} className="navbar-brand"><img src={logoimg} style={{width:"50px"}} alt="" /> Pet Nest</a>

                    <form className="d-flex me-auto ms-5" role="search">
                        <input className="form-control me-2"
                                        onChange={(e)=>setSearchCart(e.target.value)}

                        type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: "15px" }} />
                        <button className="btn btn-success" style={{ backgroundColor: "#fbab05", borderRadius: "20px", borderColor: "#fbab05" }} type="submit"><i style={{color:"black"}} className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <Link to='/main'>
                        <button className="btn btn-warning me-2" type="button" style={{  borderRadius: "20px", borderColor:"#ffc107" }}>
                        <img className='mb-1' src={btnadopt} width={"25px"} alt="" /> Adopt

                        </button>
                    </Link>
                    {isLoggedIn ? (

        
                        <>
                            <Link to='/checkout'>
                                <button className="btn btn-warning me-2" type="button" style={{ borderRadius: "20px", borderColor:"#ffc107" }}>
                                <img className='mb-1' src={kart} width={"20px"}   alt="" /> Cart</button>
                            </Link>
                            <Link to='/wishlist'>
                                <button className="btn btn-warning me-2" type="button" style={{ borderRadius: "20px", borderColor:"#ffc107" }}>Wishlist <img src={heart} width={"20px"} alt="" /></button>
                            </Link>
                            <button className="btn btn-warning me-2" type="button" onClick={handleLogout} style={{ borderRadius: "20px", borderColor:"#ffc107" }}>Logout <i class="fa-solid fa-power-off" style={{color:"red"}}></i></button>
                        </>
                                            ) : (

        
                        <Link to="/login">
                            <button className="btn btn-warning me-2" type="button" style={{ borderRadius: "20px", borderColor:"#ffc107"}}>Login <i class="fa-solid fa-power-off" style={{color:"red"}}></i></button>
                        </Link>
                                            )}

                
                </div>
            </nav>
            <div className='row'>
            {mainProduct.length > 0 ?
                    mainProduct.map((item,index) => (
                        <div className='col-md-3' key={index} >
                            <CartItems product={item} isLoggedIn={isLoggedIn}  />
                        </div>
                    )) :
                    <img src={loadingimg} alt="" style={{ width: '400px', display: 'block', margin: 'auto' }} />

                }



            </div>



            <Cartfooter/>








    </div>
  )
}

export default Cart
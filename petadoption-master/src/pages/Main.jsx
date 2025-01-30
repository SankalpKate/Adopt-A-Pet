import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../components/Cards';
import Swal from 'sweetalert2';
import { MainProjectApi } from '../services/allAPI';
import { useSelector } from 'react-redux';
import kart from '../images/shopping-cart (1).png'
import heart from '../images/heart.png'
 import loadingimg from '../images/pet-jumping-20210422 (1).gif'
import buttonimg from '../images/superman.png'
import Footer from '../components/Footer';
import logoimg from '../images/646-6464701_this-free-icons-png-design-of-dog-and.png'


function Main() {
    const [userName, setUserName] = useState("")

    const [searchKey, setSearchKey] = useState("");
    const [mainProject, setMainProject] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


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

    const getMainProject = async () => {
        const result = await MainProjectApi(searchKey);
        setMainProject(result.data);
    };

    useEffect(() => {
        getMainProject();
    }, [searchKey]);

    console.log("==searchkey===", searchKey);

    useEffect(() => {
        if (sessionStorage.getItem("existinguser")) {
            const existingUserData = JSON.parse(sessionStorage.getItem("existinguser"));
            setUserName(existingUserData.username);
        }
    }, [])





    return (
        <div>
            <nav className="navbar" style={{ backgroundColor: "#fbab05" }}>
                <div className="container-fluid">
                    <a className="navbar-brand"><img src={logoimg} style={{ width: "50px" }} alt="" /> Adopt A Pet</a>
                    <form className="d-flex me-auto ms-5" role="search">
                        <input className="form-control me-2"
                            onChange={(e) => setSearchKey(e.target.value)}
                            type="search" placeholder="Search by breed" aria-label="Search" style={{ borderRadius: "15px" }} />
                        <button className="btn btn-success" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    {/* <Link to='/cart'>
                        <button className="btn btn-primary me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>
                            <img className='mb-1' src={kart} width={"25px"} alt="" /> Shop
                        </button>
                    </Link> */}
                    {isLoggedIn ? (
                        <>
                            <Link to='/donate'>
                                <button className="btn btn-primary me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Donate</button>
                            </Link>
                            <Link to='/fav'>
                                <button className="btn btn-primary me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Saved Pets <img src={heart} width={"20px"} alt="" /></button>
                            </Link>
                            <Link to='/donated'>
                                <button className="btn btn-primary me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Heroes <img src={buttonimg} width={"25px"} alt="" /></button>
                            </Link>

                            <button className="btn btn-success me-2" onClick={handleLogout} type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Logout <i class="fa-solid fa-power-off" style={{ color: "white" }}></i></button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-success me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Login <i class="fa-solid fa-power-off" style={{ color: "white" }}></i></button>
                        </Link>
                    )}
                </div>
            </nav>
            <div>
                {isLoggedIn && <h1 className='text-dark mt-5 ms-5' style={{ fontFamily: "initial" }}>Welcome, {userName}</h1>}
            </div>
            <div className='row '>
                {mainProject.length > 0 ?
                    mainProject.map((item, index) => (
                        <div className='col-md-6' key={index}>
                            <Cards project={item} isLoggedIn={isLoggedIn} />
                        </div>
                    )) :
                    <img src={loadingimg} alt="" style={{ width: '400px', display: 'block', margin: 'auto' }} />

                }
            </div>
            <Footer />
        </div>
    );
}

export default Main;

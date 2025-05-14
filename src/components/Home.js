import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
import ChangePassword from './ChangePassword';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Profile from './Profile';
import { BrowserRouter, useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // console.log("No token found, redirecting to login.");
            navigate("/login");
        }
    }, [navigate]);

    let candidateName=localStorage.getItem("candidateName");
    // console.log("candidateName",candidateName);
    
    const showProfile =() =>{
        const div = document.createElement('div');
        const root = createRoot(div);
        Swal.fire({
            title:'Profile Details',
            html: div,
            showConfirmButton: false,
            showCloseButton: true,
        });
        

        root.render(<Profile UserName={candidateName} />);
    };


    const showChangePasswordPopup = () => {
        const div = document.createElement('div');
        const root = createRoot(div);

        Swal.fire({
            title: 'Change Password',
            html: div,
            showConfirmButton: false,
            showCloseButton: true,
        });

        root.render(
            <BrowserRouter>
        <ChangePassword />
        </BrowserRouter>
    );
    };

    const handleLogout = () => {
        localStorage.removeItem("candidateName");
        localStorage.removeItem("token");
      };
      
    

    return (
        <div className=" container d-flex flex-column align-items-center mt-3">
        <div className=" container mt-5 mb-4">
            <div className="d-flex justify-content-between align-items-center border" >
                <h3 className="m-0">Learning App</h3>
                <div className="d-flex align-items-center">
                    <h3 className="m-0">{candidateName}</h3>
                    <div className="dropdown ms-3">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#" onClick={showProfile}>Profile</a></li>
                            <li><a className="dropdown-item" href="#" onClick={showChangePasswordPopup}>Change Password</a></li>
                            <li><a className="dropdown-item" href="/login" onClick={handleLogout} >Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className='container border d-flex flex-column align-items-left justify-content-center mb-4'>
        <div className='dropdown ms-3'>
            <button className='btn dropdown-toggle border mt-3 mb-2' type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false' data-bs-auto-close='outside'>
            Services
            </button><br />
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                <li><a className='dropdown-item' href='/userAddressDetails' >Fill Address Details</a></li>
                <li><a className='dropdown-item' href='/StudyDetails' >Study Details</a></li>
                <li><a className='dropdown-item' href='/ageCalcualtor' >Calculate Your Age</a></li>
            </ul>
            <button className='btn dropdown-toggle border mb-2' type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false' data-bs-auto-close='outside'>
            Reports
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                <li><a className='dropdown-item' href='/districtWiseReport' >District Wise Report</a></li>
                <li><a className='dropdown-item' href='/districtReport' >District Report</a></li>
            </ul>   
        </div>
        </div>
        
    </div>
    
    )
}

export default Home;
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from '../assets/profile.png';  
import logo from '../assets/logo.png';
import axios from 'axios';  

 export default function Navbar(props) {
  const userId = parseInt(localStorage.getItem("user_id") || "0");
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");  
    navigate("/login");                     
  };

  const handleProtectedClick = (path) =>{
    if(isLoggedIn){
      navigate(path);
    }
    else{
      navigate("/login");
      props.showAlert("Please Login First", "danger")
    }
  };
  
  const handleDownload = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.get(`https://portfolio-builder-i2dz.onrender.com/api/download/${userId}/`, {
          responseType: 'blob'  // Important to handle file download
        });

        const blob = new Blob([res.data], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "portfolio.html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        props.showAlert("Your portfolio is downloading...", 'success');
      } 
    catch (error) {
      const msg = error.response?.data?.error || "Unable to download portfolio. Please complete all sections first.";
      props.showAlert(msg, 'danger');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 navbar-dark bg-secondary">
      <Link className="navbar-brand fw-bold" to="/">
          <img src={logo} alt="Logo" height="60" className="rounded-circle" 
          style={{ width: "40px", height: "40px", cursor: "pointer" }}/>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
          <li className="nav-item"><Link className="nav-link text-light" to="/">Home</Link></li>

          <li className="nav-item"><button className="btn nav-link text-light" style={{ background: "none", border: "none", cursor: "pointer" }} 
          onClick={() => handleProtectedClick("/basicdetails")}>Basicdetails </button></li>

          <li className="nav-item"><button className="btn nav-link text-light" style={{ background: "none", border: "none", cursor: "pointer" }} 
              onClick={() => handleProtectedClick("/maindetails")}>Maindetails</button></li>
          <li className="nav-item"><Link className="nav-link text-light" to="/about">About</Link></li>
        </ul>

        {isLoggedIn && (
          <div className="dropdown">
          <img src={profileImage} alt="profile" height="40" className="rounded-circle" 
          style={{ width: "40px", height: "40px", cursor: "pointer" }} data-bs-toggle="dropdown" />
          <ul className="dropdown-menu dropdown-menu-end">
            <li><button onClick={handleDownload} className="dropdown-item">Download Portfolio</button></li>
            <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
          </ul>
        </div>
        )}

      </div>
    </nav>
  );
}



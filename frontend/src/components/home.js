import React from "react";
import { useNavigate } from "react-router-dom";
import cover from "../assets/cover.png";

const Home = (props) => {
   const navigate = useNavigate();

  // Read login status from localStorage
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const handleProtectedClick = (path) =>{
    if(isLoggedIn){
      navigate(path);
    }
    else{
      navigate("/login");
      props.showAlert("Please Login First", "danger")
    }
  };

  return (
    <div className="box">
  {/* Text + Buttons Section */}
  <div className="col-md-6 col-sm-12" style={{ paddingLeft: "40px", marginTop: "150px" }}>
    <h1 className="fw-bold" style={{ marginTop: "80px" }}>
      Welcome to Portfolio - Builder
    </h1>
    <h3 className="text-secondary">
      Generates personalized portfolio websites to showcase your skills and projects.
    </h3>
  </div>

  {/* Button Section */}
  <div className="d-flex flex-sm-row align-items-center justify-content-start gap-3"
    style={{ height: "15vh", paddingLeft: "20px", color: "#fff", marginBottom: "250px" }}>

    <button className="btn btn-primary btn-lg fw-bold" onClick={() => handleProtectedClick("/basicdetails")}>
      Create Portfolio
    </button>

    {!isLoggedIn && (
      <button className="btn btn-outline-secondary btn-lg fw-bold" onClick={() => navigate("/register")}>
        Sign Up
      </button>
    )}

    {/* IMAGE - Only show on large screens and above */}
    <div className="d-none d-lg-flex" style={{ paddingLeft: "700px" }}>
      <img src={cover} alt="Cover" height="40" className="rounded" style={{ width: "450px", height: "400px", cursor: "pointer" }}/>
    </div>
  </div>
</div>

  );
};

export default Home;

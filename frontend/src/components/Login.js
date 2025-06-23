import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending login data:", formData);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Backend should return something like: { "message": "Login successful" }
      if (response.status === 200) {
        sessionStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user_id", response.data.id);
        props.showAlert('Login successful!', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      props.showAlert(error.response?.data?.error || "Login failed", 'danger');
    }
  };

  

  return (
    <>

    <h1 className="text-center my-5">Sign In</h1>

     <div className="container">
        <div className="row row-cols-sm-1 row-cols-lg-3  container">
            <div className="col-12">
            </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type='text' name='username' className="form-control" value={formData.username} onChange={handleChange}   placeholder="Username"  />
                    </div>
                    <div className="mb-4">
                        <input type="password" name='password' className="form-control" value={formData.password} onChange={handleChange}  placeholder="Password" />
                    </div>
                    <div className="d-flex justify-content-between" style={{marginBottom: "200px"}}>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                        <p>Already a user? <Link to="/register" className="text-decoration-none">Sign Up</Link></p>
                    </div>
                </form>
        </div>
          
    </div>
    </>
  )
}


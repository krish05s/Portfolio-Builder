import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register(props) {
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

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      sessionStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_id", response.data.id);
      props.showAlert('Registration successful!', 'success');
      navigate('/');
    }
  } catch (error) {
    const errMsg = error.response?.data?.error || 'Registration failed, Invalid Data';
    props.showAlert(errMsg, "danger");
    console.error("Registration error:", error.response?.data);
  }
};

  return (
    <>

    <h1 className="text-center my-5">Sign Up</h1>

     <div className="container">
        <div className="row row-cols-sm-1 row-cols-lg-3  container">
            <div className="col-12">
            </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <input type="username" name="username" className="form-control" onChange={handleChange} value={formData.username} placeholder="Username" />                    
                    </div>
                    <div className="mb-3">
                        <input type="email" name="email" className="form-control" onChange={handleChange} value={formData.email} aria-describedby="emailHelp" placeholder="Email"  />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" className="form-control" onChange={handleChange} value={formData.password} placeholder="Password" />
                    </div>
                    <div className="mb-4">
                        <input type="password" name="password2" className="form-control" onChange={handleChange} value={formData.password2} placeholder="Confirm Password" />
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                        <button type="submit" className="btn btn-primary mb-5">Sign Up</button>
                        <p>Already a user? <Link to="/login" className="text-decoration-none">Sign In</Link></p>
                    </div>
                </form>
        </div>
          
    </div>
    </>
  )

}

export default Register;
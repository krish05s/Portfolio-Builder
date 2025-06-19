import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function BasicDetails(props) {
  const navigate = useNavigate();
  const userId = 1; // Replace with dynamic logic later
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    overview: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    age: '',
    email: '',
    degree: '',
    bio: ''
  });


  // Fetch existing data on mount
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/basic/1/`);
      setFormData(res.data);
      setIsUpdating(true);

    } catch (err) {
      console.log("Fetch error:", err.message);
    }
  };
  fetchData();
}, []);

  // Handle form input changes
  const handleChange = (e) => {
  const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      if (isUpdating) {
        await axios.put(`http://127.0.0.1:8000/api/basic/${userId}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        props.showAlert("Data Updated Successfully", "success");
      } else {
        await axios.post(`http://127.0.0.1:8000/api/basic/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        props.showAlert("Form Submitted Successfully", "success");
      }
      navigate("/maindetails");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };




  return (
    <div className="d-flex justify-content-center" style={{marginTop: "70px", marginBottom:"70px"}}>
        <div className="card shadow" style={{width: "80rem", height: "39rem"}}>
          <h2 className='text-center text-secondary mt-3'>BasicDetails - Form</h2>
          <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                {/* Form Inputs */}
                <div className="col-md-6">
                  <label className="form-label">Name :</label>
                  <input type="text" name='username' className="form-control" value={formData.username} onChange={handleChange} placeholder="Firstname Lastname" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile :</label>
                  <input type="text" name='mobile' className="form-control" value={formData.mobile} onChange={handleChange} placeholder="Mobile No" />
                </div>
                <div className="col-12">
                  <label className="form-label">Professional Overview :</label>
                  <textarea name='overview' className="form-control" value={formData.overview} onChange={handleChange} placeholder="Enter Professional Overview" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City :</label>
                  <input type="text" name='city' className="form-control" value={formData.city} onChange={handleChange} placeholder="City" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">State :</label>
                  <input type="text" name='state' className="form-control" value={formData.state} onChange={handleChange} placeholder="State" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Zip :</label>
                  <input type="text" name='zip' className="form-control" value={formData.zip} onChange={handleChange} placeholder="Pin Code" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">DOB :</label>
                  <input type="text" name='dob' className="form-control" value={formData.dob} onChange={handleChange} placeholder="DD/MM/YYYY" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Age :</label>
                  <input type="text" name='age' className="form-control" value={formData.age} onChange={handleChange} placeholder="age" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Email :</label>
                  <input type="email" name='email' className="form-control" value={formData.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Degree :</label>
                  <input type="text" name='degree' className="form-control" value={formData.degree} onChange={handleChange} placeholder="Degree" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Job Role :</label>
                  <input type="text" name='bio' className="form-control" value={formData.bio} onChange={handleChange} placeholder="Enter Job Role" />
                </div>
                <div className="col-md-6">
                </div>
                <div className="col-md-12 text-center">
                  <button type='submit' className='btn btn-primary bt-lg rounded-start-pill'>{isUpdating ? "Update" : "Upload"}</button>
                  <button type='button' className='btn btn-outline-secondary bt-lg rounded-end-pill mx-2' onClick={() =>navigate("/maindetails")}>Next</button>
                </div>
              </form>
          </div>
        </div>
    </div>
  );
}

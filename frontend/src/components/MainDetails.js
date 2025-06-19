import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MainDetails(props) {

  const navigate = useNavigate();
  const userId = 1; // Replace with dynamic logic later
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    job: '',
    experience: '',
    linkedin: '',
    edu1_name: '',
    edu1_desc: '',
    edu2_name: '',
    edu2_desc: '',
    edu3_name: '',
    edu3_desc: '',
    project1_title: '',
    project1_technology: '',
    project1_desc: '',
    project2_title: '',
    project2_technology: '',
    project2_desc: ''
  });


  // Fetch existing data on mount
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/main/1/`);
      setFormData(res.data);
      setIsUpdating(true);

    } catch (err) {
      console.log("Fetch error:", err.message);
    }
  };
  fetchData();
}, []);

  // Handle Changes
   const handleChange = (e) => {
   const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      if (isUpdating) {
        await axios.put(`http://127.0.0.1:8000/api/main/${userId}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        props.showAlert("Data Updated Successfully", "success");
      } else {
        await axios.post(`http://127.0.0.1:8000/api/main/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        props.showAlert("Form Submitted Successfully", "success");
      }
      navigate("/portfolio");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };


  return (
    <div className="d-flex justify-content-center" style={{marginTop: "70px", marginBottom:"70px"}}>
        <div className="card shadow" style={{width: "80rem", height: "62rem"}}>
          <h2 className='text-center text-secondary mt-3'>MainDetails - Form</h2>
          <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>

                <div className="col-md-6">
                  <label className="form-label">Work-Experience :</label>
                  <input type="text" className="form-control mb-2" name='company' value={formData.company} onChange={handleChange} placeholder='Company Name'/>
                  <input type="text" className="form-control mb-2" name='job' value={formData.job} onChange={handleChange} placeholder='Job Role'/>
                  <textarea className="form-control" name='experience' value={formData.experience} onChange={handleChange} placeholder="Description of Work experience"/>
                </div>
                <div className="col-md-6">
                  
                  <br></br>
                  <br></br>
                  <label  className="form-label">Linked In:</label>
                  <input type="text" className="form-control" name='linkedin' value={formData.linkedin} onChange={handleChange} placeholder='Linked-In Profile URL'/>
                </div>
                <div className="col-md-12">
                  <p className='text-secondary'>Note: Please add recent work experience or internship experience.</p>
                </div>

                <div className="col-md-12">
                    <h4>Education details :</h4>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Education 1 :</label>
                  <input type="text" className="form-control mb-2" name='edu1_name' value={formData.edu1_name} onChange={handleChange} placeholder='School/University'/>
                  <textarea className="form-control" name='edu1_desc' onChange={handleChange} value={formData.edu1_desc} placeholder="Short Summary of School/University"/>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Education 2 :</label>
                  <input type="text" className="form-control mb-2" name='edu2_name' value={formData.edu2_name} onChange={handleChange} placeholder='School/University'/>
                  <textarea className="form-control" name='edu2_desc' onChange={handleChange} value={formData.edu2_desc} placeholder="Short Summary of School/University"/>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Education 3 :</label>
                  <input type="text" className="form-control mb-2" name='edu3_name' value={formData.edu3_name} onChange={handleChange} placeholder='School/University'/>
                  <textarea className="form-control" name='edu3_desc' onChange={handleChange} value={formData.edu3_desc} placeholder="Short Summary of School/University"/>
                </div>
                <div className="col-md-12">
                  <p className='mb-4 text-secondary'>Note: Please add recent 3 education details and add to college to school.</p>
                </div> 

                <div className="col-md-12">
                    <h4>Project details :</h4>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Project 1 :</label>
                  <input type="text" className="form-control mb-2" name='project1_title' value={formData.project1_title} onChange={handleChange} placeholder='Project Title'/>
                  <input type="text" className="form-control mb-2" name='project1_technology' value={formData.project1_technology} onChange={handleChange} placeholder='Technologies Used'/>
                  <textarea className="form-control" name='project1_desc' onChange={handleChange} value={formData.project1_desc} placeholder="Description About Project"/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Project 2 :</label>
                  <input type="text" className="form-control mb-2" name='project2_title' value={formData.project2_title} onChange={handleChange} placeholder='Project Title'/>
                  <input type="text" className="form-control mb-2" name='project2_technology' value={formData.project2_technology} onChange={handleChange} placeholder='Technologies Used'/>
                  <textarea className="form-control" name='project2_desc' value={formData.project1_desc} onChange={handleChange} placeholder="Description About Project"/>
                </div>
                <div className="col-md-12">
                  <p className='mb-4 text-secondary'>Note: Please add recent 2 Project Data.</p>
                </div>
                <div className="col-md-12 text-center">
                  <button type='button' className='btn btn-outline-secondary bt-lg rounded-start-pill mx-2' onClick={() =>navigate("/basicdetails")}>Previous</button>
                  <button type='submit' className='btn btn-primary bt-lg '>{isUpdating ? "Update" : "Upload"}</button>
                  <button type='button' className='btn btn-outline-secondary bt-lg rounded-end-pill mx-2' onClick={() =>navigate("/portfolio")}>Next</button>
                </div>
              </form>
          </div>
        </div>
    </div>
  )
}

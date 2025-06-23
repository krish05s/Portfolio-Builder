import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Portfolio(props) {
  const userId = parseInt(localStorage.getItem("user_id") || "0");

  const [profile, setProfile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [fetchedImages, setFetchedImages] = useState(null);


  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing. Please ensure the user is logged in.");
      return;
    }
    fetchImages();
  }, [userId]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profile') {
      setProfile(files[0]);
    } else if (name === 'cover_image') {
      setCoverImage(files[0]);
    }
  };

  const fetchImages = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/images/${userId}/`);
    if (res.status === 200) {
      setFetchedImages(res.data);  // ✅ store response
      setIsUpdating(true);
    }
  } catch (err) {
    if (err.response?.status === 404) {
      setIsUpdating(false);
      setFetchedImages(null);
    } else {
      console.error('Fetch Error:', err.message);
    }
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile && !coverImage) {
      props.showAlert("Please select at least one image to upload.", 'warning');
      return;
    }

    const formData = new FormData();
    if (profile) formData.append('profile', profile);
    if (coverImage) formData.append('cover_image', coverImage);

    try {
      let res;
      if (isUpdating) {
        res = await axios.put(`http://127.0.0.1:8000/api/images/${userId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        props.showAlert("Images updated successfully.", 'success');
      } else {
        formData.append('user', userId.toString());
        res = await axios.post(`http://127.0.0.1:8000/api/images/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        props.showAlert("Images uploaded successfully.", 'success');
      }

      setUploaded(true);
      console.log("Upload Success:", res.data);
    } catch (err) {
      console.error('Upload Error:', err.response?.data || err.message);
      props.showAlert("Upload failed. Please try again.", 'danger');
    }
  };

  useEffect(() => {
    if (uploaded) {
      fetchImages();
      setUploaded(false);
    }
  }, [uploaded]);

  const handleDownload = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/download/${userId}/`, {
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
  } catch (error) {
    const msg = error.response?.data?.error || "Unable to download portfolio. Please complete all sections first.";
    props.showAlert(msg, 'danger');
  }
};


  return (
    <div className="d-flex justify-content-center" style={{marginTop: "70px", marginBottom:"70px"}}>
        <div className="card" style={{width: "80rem", height: "25rem"}}>
          <h2 className='text-center text-secondary mt-3'>Portfolio</h2>
          <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>

                <div className="col-md-6">
                  <label className="form-label">Profile Image</label>
                  <input type="file" name="profile" className="form-control" onChange={handleFileChange} />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Cover Image</label>
                    <input type="file" name="cover_image" className="form-control" onChange={handleFileChange} />
                </div>

                {fetchedImages && (
                <div className="mt-3">
                    {fetchedImages.profile && (
                    <p>Current Profile Image: <strong>{fetchedImages.profile.split('/').pop()}</strong></p>
                    )}
                    {fetchedImages.cover_image && (
                    <p>Current Cover Image: <strong>{fetchedImages.cover_image.split('/').pop()}</strong></p>
                    )}
                </div>
                )}
                <div className="col-md-12 text-center">
                    <button className="btn btn-primary rounded-start-pill mx-3" type="submit">Upload Images</button>
                    <button onClick={handleDownload} className="btn btn-success rounded-end-pill"> 
                        Download Portfolio
                    </button>
                </div>
                
              </form>
          </div>
        </div>
    </div>
  )
}

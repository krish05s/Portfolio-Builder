import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Portfolio(props) {
    const userId = 1;

    const [profile, setProfile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [fetchedImages, setFetchedImages] = useState(null);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
            if (name === 'profile') {
              setProfile(files[0]);
            } else if (name === 'cover_image') {
              setCoverImage(files[0]);
            }
        };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profile && !coverImage) {
        props.showAlert("Please select at least one image to upload.",'warning');
        return;
    }

    const formData = new FormData();
        if (profile) formData.append('profile', profile);
        if (coverImage) formData.append('cover_image', coverImage);

        try {
          const res = await axios.post('http://127.0.0.1:8000/api/images/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          console.log('Upload Success:', res.data);
          setUploaded(true);
          props.showAlert("Images uploaded successfully.",'success');
        } catch (err) {
          console.error('Upload Error:', err.response?.data || err.message);
        }
    };

    const fetchImages = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/images/');
            console.log("Fetched image data:", res.data);  // Debug here

            const images = res.data;
            if (Array.isArray(images) && images.length > 0) {
            setFetchedImages(images[images.length - 1]); // Show latest
            }
        } catch (err) {
            console.error('Fetch Error:', err.message);
        }
    };

   useEffect(() => {
    fetchImages();         // Fetch on mount
    }, []);

    useEffect(() => {
    if (uploaded) {
        fetchImages();
        setUploaded(false); 
    }
    }, [uploaded]);


const handleDownload = (e) => {
    e.preventDefault(); // 
    props.showAlert("Your portfolio is downloading...", 'success');
    window.location.href = `http://127.0.0.1:8000/api/download/${userId}/`;
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

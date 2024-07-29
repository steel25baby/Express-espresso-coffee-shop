import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function AdminMenu() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const apiurl = "http://localhost:5000"; 
  const cloudName = "ds69x9aix";
  const preset = "Bridget";

  // const handleUploadImage = async () => {
  //   const payload = new FormData();
  //   payload.append("file", file);
  //   payload.append("upload_preset", preset);
  //   try {
  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
  //       payload,
  //     );
  //     const secure_url = response.data.secure_url;
  //     const imageUrl = secure_url.replace("/upload/", "/upload/w_400/f_auto/");
  //     console.log(imageUrl);
  //     return imageUrl;
  //   } catch (err) {
  //     console.error(err);
  //     alert("Image upload failed. Please try again.");
  //     return null;
  //   }
  // };

  const handleSubmit = async (formValues) => {
    try {
      setLoading(true);
      setError(null);
      // const imageUrl = await handleUploadImage();
      // if(!imageUrl){
      //   setLoading(false);
      //   return;
      // }
      const response = await fetch(`${apiurl}/api/coffee/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      const data = await response.json();
      console.log(data);
      if (data.success === true) {
        alert('Data sent to database');
        navigate('/viewMenu');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      variety: '',
      ingredients: '',
      price: '',
      description: '',
      imgUrl: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <h1>Coffee Shop</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='Coffee-input'>
          <div className='Coffee-items'>
            <input
              type='text'
              name='variety'
              value={formik.values.variety}
              onChange={formik.handleChange}
              placeholder='Enter Coffee variety'
            />
            <input
              type='text'
              name='ingredients'
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              placeholder='Enter Coffee Ingredients'
            />
            <input
              type='number'
              name='price'
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder='Enter Coffee price'
            />
            <input
              type='text'
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder='Enter Coffee description'
            />
            <input
              type='text'
              name='imgUrl'
              value={formik.values.imgUrl}
              onChange={formik.handleChange} 
              placeholder='Enter Image URL'
            />
          </div>
          <div>
            <button type='submit' className='submit-coffee' disabled={loading}>
              {loading ? 'Loading...' : 'Update Menu'}
            </button>
            <p className='error'>{error && error}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminMenu;
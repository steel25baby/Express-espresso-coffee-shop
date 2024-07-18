import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Your Email is required"),
  password: Yup.string().min(5, "Enter at least 5 characters").required("Please enter your password")
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      if (values.email === "test@example.com" && values.password === "password") {
        navigate('/dashboard'); 
      } else {
        setErrors({ general: "Invalid email or password" });
      }
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className='Login-form'>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className='L-form'>
            <h1>LOGIN</h1>
            <div className='Enter-group'>
              <div className='Enter-field'>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="Email Address" className="email" />
                <ErrorMessage name='email' component="div" className='error' />
              </div>
              <div className='Enter-field'>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" placeholder="Password" className="password" />
                <ErrorMessage name='password' component="div" className='error' />
              </div>
              <ErrorMessage name='general' component="div" className='error' />
              <div className='SendDiv'>
                <button type='submit' disabled={isSubmitting} className='Sendbtn'>
                  LOGIN
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login;

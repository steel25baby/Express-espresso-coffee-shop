import React, { useState } from 'react';
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Your first name is required"),
  lastName: Yup.string().required("Your last name is required"),
  username: Yup.string().required("Please enter your username"),
  email: Yup.string().email("Invalid email address").required("Please enter your email"),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required("Please enter your password")
});

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
      setLoading(true);
      setError(null);
      try {
          console.log("Form Values:", formValues); // Log form values for debugging
          const response = await fetch(`http://localhost:5000/api/customers/register`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formValues)
          });

          if (!response.ok) {
              const errorData = await response.json();
              console.log("Error Response Data:", errorData); // Log error response data
              throw new Error(errorData.message || "Failed to register");
          }

          const data = await response.json();
          console.log("Registration successful", data);
          navigate("/login");
      } catch (error) {
          console.error("Error during registration:", error); // Log the error
          setError(error.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className='Big-signup'>
      <Formik
        initialValues={{ firstName: "", lastName: "", username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className='Signup-form'>
            <h1>Sign up</h1>
            <div className='Sign-up'>
              <div className='signup-details'>
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="firstName"
                  autoComplete="given-name"
                />
                <ErrorMessage name='firstName' component="div" className='error' />
              </div>
              <div className='signup-details'>
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="lastName"
                  autoComplete="family-name"
                />
                <ErrorMessage name='lastName' component="div" className='error' />
              </div>
              <div className='signup-details'>
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="username"
                  autoComplete="username"
                />
                <ErrorMessage name='username' component="div" className='error' />
              </div>
              <div className='signup-details'>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="email"
                  autoComplete="email"
                />
                <ErrorMessage name='email' component="div" className='error' />
              </div>
              <div className='signup-details'>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="password"
                  autoComplete="new-password"
                />
                <ErrorMessage name='password' component="div" className='error' />
              </div>
              {error && <div className='error'>{error}</div>}
              <div className='Signup-button'>
                <button type='submit' disabled={isSubmitting || loading} className='Signbtn'>
                  {loading ? 'Signing up...' : 'Sign up'}
                </button>
              </div>
            </div>
            <p className='loginpara'>
              If you have an account, click here <Link to="/login">Login</Link> to continue
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useCustomerStore from '../Store/customerStore';
import useLoginStore from '../Store/login.store';

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Your Email is required"),
  password: Yup.string().min(5, "Enter at least 5 characters").required("Please enter your password")
});

const Login = () => {
  const navigate = useNavigate();
  const changeCustomerInformation=useCustomerStore((state)=>state.changeCustomerInformation);
  const customerData=useCustomerStore((state)=>state.customer);
  const setLogin=useLoginStore((state)=>state.setLogin)
  const login=useLoginStore((state)=>state.login)

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('http://localhost:5000/api/customers/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful', data);
      console.log(data.success);
      setLogin(data.success);
      // console.log(login);

      changeCustomerInformation(data);
      console.log(customerData.data);
      
      navigate('/adminMenu'); 
    } catch (error) {
      setFieldError('general', 'Invalid email or password');
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
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
  );
};

export default Login;

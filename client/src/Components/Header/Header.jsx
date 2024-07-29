import React, { useState } from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/coffee logo.jpeg"
import { PiShoppingCartThin } from "react-icons/pi";
import useLoginStore from '../../pages/Store/login.store';

const Header = () => {
  const [error, setError]=useState("");
  const login=useLoginStore((state)=>state.login);
  const setLogin=useLoginStore((state)=>state.setLogin);
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try {
      const response = await fetch('http://localhost:5000/api/customers/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      setLogin(false)
      console.log(login);
      navigate("/login")
    } catch (error) {
      setError("An issue occurred when login out")
    }
  }
  return (
    <>
    <section className='Header'>
      <div className='Pages-navbar'>
        <ol className='Navbar-list'>
          <li className='Navbar-item'>
            <Link to="/">home</Link>
          </li>
          <li className='Navbar-item'>
            <Link to="/menu">menu</Link>
          </li>
          <li className='Navbar-item'>
            <Link to="/contacts">contacts</Link>
          </li>
        </ol>
      </div>
      <div className='Header-logo'>
        <img src={Logo} alt="" />
      </div>
      <div className='Header-ctas'>
       {login &&  login===true ? <Link onClick={handleLogout} className='nav-link'>Log Out</Link>: (
        <>
        <Link to="/login" className='nav-link'>login</Link>
        <Link to="/register" className='nav-link'>register</Link>
        </>
       )}
      </div>
      <div className='Header-cart'>
        <Link to="/cart"><PiShoppingCartThin /></Link>
      </div>
    </section>
    </>
  )
}

export default Header
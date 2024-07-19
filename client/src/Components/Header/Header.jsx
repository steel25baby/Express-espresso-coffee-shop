import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import Logo from "../../assets/HeaderLogo.jpeg"

const Header = () => {
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
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
      </div>
    </section>
    </>
  )
}

export default Header
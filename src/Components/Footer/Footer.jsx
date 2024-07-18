import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
import { IoLogoInstagram } from "react-icons/io5";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";

const Footer = () => {
  return (
    <>
    <section className='Footer'>
      <div className='Contact-icons'>
        <h3>Social Media</h3>
        <div>
        <Link className='footer-icons'><IoLogoInstagram/></Link>
        <Link className='footer-icons'><SlSocialFacebook/></Link>
        <Link className='footer-icons'><RiTwitterXLine/></Link>
        </div>
      </div>
      <div className='Pages-icons'>
        <h3>Pages</h3>
        <div>
        <Link className='footer-icons' to="/"><IoHomeOutline/></Link>
      <Link className='footer-icons' to="/menu"><MdRestaurantMenu/></Link>
      <Link className='footer-icons'to="/contacts"><MdOutlineContactPhone/></Link>
        </div>
      </div>
    </section>
    </>
  )
}

export default Footer
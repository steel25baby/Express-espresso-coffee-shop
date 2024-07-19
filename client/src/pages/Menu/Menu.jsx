import React, { useEffect, useState } from 'react'
import "./Menu.css"
import { Link } from 'react-router-dom'
import cup1 from "../../assets/coffee1.jpeg"


const Menu = () => {
  const [coffee, setCoffee]=useState([]);

  const fetchCoffeeData=async() => {
    try {
      const response = await fetch('http://localhost:5000/api/coffee/')
      // console.log(response);
      const data= await response.json();
      // console.log(data.coffee);
      setCoffee(data.coffee);
      // console.log(coffee);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchCoffeeData();
  },[])
  return (
    <>
      {coffee && coffee.map((data)=>(
        <section className='Menu' key={data.id}>
        <div className='Menu-card'>
          <div className='Card-image'>
            <img src={cup1} alt="" />
          </div>
          <div className='Card-details'>
            <h3>{data.variety}</h3>
            <p>{data.ingredients}</p>
            <h4>@{data.price}Ksh</h4>
          </div>
        </div>
        <div className='Card-description'><p>{data.description}</p></div>
      </section>
      ))}
    </>
  )
}

export default Menu
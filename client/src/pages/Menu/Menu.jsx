import React, { useEffect, useState } from 'react';
import "./Menu.css";
import { Link } from 'react-router-dom';
import cup1 from "../../assets/coffee1.jpeg";
import { useCart } from '../Cart/Cartcontext';

const Menu = () => {
  const [coffee, setCoffee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, isInCart } = useCart();

  const fetchCoffeeData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/coffee/');
      const data = await response.json();
      setCoffee(data.coffee);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCoffeeData();
  }, []);

  const handleAddToCart = (current) => {
    if (!isInCart(current.id)) {
      addToCart(current);
      alert("Successfully Added to Cart");
    } else {
      alert("Already Added to the Cart");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {coffee && coffee.map((data) => (
        <section className='Menu' key={data.id}>
          <div className='Menu-card'>
            <div className='Card-image'>
              <img src={cup1} alt="" />
            </div>
            <div className='Card-details'>
              <h3>{data.variety}</h3>
              <p>{data.ingredients}</p>
              <h4>@{data.price}Ksh</h4>
              <div className='Cart-button'><button onClick={() => handleAddToCart(data)}>Add To Cart</button></div>
            </div>
          </div>
          <div className='Card-description'><p>{data.description}</p></div>
        </section>
      ))}
    </>
  )
}

export default Menu;

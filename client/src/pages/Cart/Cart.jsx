import React from 'react'
import { Link } from 'react-router-dom' 
import { CartProvider, useCart} from "./Cartcontext"
import { FaTrashAlt } from "react-icons/fa";
import cup1 from "../../assets/coffee1.jpeg";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <>
    <div>Coffee Cart</div>
    <table>
      <thead>
        <tr>
          <th>Coffee</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item)=>(
          <tr key={item.id}>
            <td>
              <img src={item.imgurl} alt="" />
              <p>{item.variety}</p>
              <p>{item.price}</p>
            </td>
            <td>
              <button onClick={() =>
                handleQuantityChange(item.id, item.quantity - 1)
              }>
                -
              </button>
              <button onClick={() =>
                handleQuantityChange(item.id, item.quantity +1)
                }>
                  +
              </button>
              <span>{item.quantity}</span>
            </td>
            <td>
            Ksh. {(parseFloat(item.price) * item.quantity).toFixed(2)}{" "} 
            </td>
            <td>
            <button onClick={() => removeFromCart(item.id)}>
                  <FaTrashAlt />
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>
        <h3>Total: ksh.{getTotalPrice()}</h3>
        <button>Buy Now</button>
        <button onClick={clearCart}>Clear cart</button>
      </div>
    </>
  )
}

export default Cart;
export { CartProvider };
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const getTotal = () => {
    return cartItems
      .reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn back-btn">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="details">
              <h3>{item.title}</h3>
              <p className="price">${item.price}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ${getTotal()}</h3>
        <Link to="/payment" className="btn checkout-btn">
          Go to Payment
        </Link>
      </div>
    </div>
  );
};

export default Cart;


// const Cart = () => {

//   return (
//     <div className="cart">
//         Cart 
//     </div>
//   );
// };

// export default Cart;


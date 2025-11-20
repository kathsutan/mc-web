import "./Payment.css";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const {cartItems, clearCart} = useContext(CartContext)

  const totalPrice = cartItems.reduce((sum,item)=>sum + item.price * item.quantity, 0).toFixed(2);

  const [shipping, setShipping] = useState({
    fullname: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  })

  const[method, setMethod] = useState('card');
  // initial state as cart (credit card)

  const [card, setCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  })

  const navigate = useNavigate()

  const handlePay = () => {
    setTimeout(() => {
      clearCart()
      navigate('/payment-success')
    }, 2000)
  }

  return (
    <div className="payment-page">
      <h2>Payment</h2>
      <div className="payment-container"> 
        <div className="form-section">
          <h3>Shipping Address</h3>

          <div className="form-group">
            <label>Full Name</label>
            <input value={shipping.fullname} onChange={(e)=>setShipping({...shipping,fullname: e.target.value})}></input>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input value={shipping.address} onChange={(e)=>setShipping({...shipping,address: e.target.value})}></input>
          </div>

          <div className="two-col">

            <div className="form-group">
              <label>City</label>
              <input value={shipping.city} onChange={(e)=>setShipping({...shipping,city: e.target.value})}></input>
            </div>

            <div className="form-group">
              <label>Zip</label>
              <input value={shipping.zip} onChange={(e)=>setShipping({...shipping,zip: e.target.value})}></input>
            </div>

          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input value={shipping.phone} onChange={(e)=>setShipping({...shipping,phone: e.target.value})}></input>
          </div>

          <h3>Payment Method</h3>

          <div className="form-group">
            <select onChange={(e)=>{setMethod(e.target.value)}}>
              <option value='card'>Credit Card</option>
              <option value='gift'>Gift Card</option>
              <option value='credit'>Store Credit</option>
            </select>
          </div>

          {method === 'card' && (
            <div className="credit-card-box">
              <div className="form-group">
                <label>Name on Card</label>
                <input value={card.name} onChange={(e)=>setCard({...card,name: e.target.value})}></input>
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input value={card.number} onChange={(e)=>setCard({...card,number: e.target.value})}></input>
              </div>
              <div className="form-group">
                <label>Expiry</label>
                <input value={card.expiry} onChange={(e)=>setCard({...card,expiry: e.target.value})}></input>
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input value={card.cvv} onChange={(e)=>setCard({...card,cvv: e.target.value})}></input>
              </div>
            </div>
          )}

        </div>

        <div className="summary-section">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item)=>(
              <li key={item.id}>
                {item.title} * {item.quantity}
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="total">
            Total: <strong>${totalPrice}</strong>
          </div>
          <button className="pay-btn" onClick={handlePay}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

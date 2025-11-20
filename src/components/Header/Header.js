import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Header = () => {

    const {cartItems} = useContext(CartContext)
    const cartCount = cartItems.reduce((sum,item)=>sum + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="logo">
        🛒 ShopEase
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <div className="cart-link">
          <Link to="/cart">Cart</Link>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
        
        {/* <Link to="/payment">Payment</Link> */}
      </nav>
    </header>
  );
};

export default Header;

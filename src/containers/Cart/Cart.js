import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const savedItems = [];

  return (
    <div className="cart-container">
      <h1>Saved Furniture Items</h1>
      
      {savedItems.length === 0 ? (
        <div className="empty-cart">
          <h2>No saved items yet</h2>
          <p>Start exploring the gallery and save your favorite furniture items!</p>
          <Link to="/" className="minecraft-button primary">
            Browse Gallery
          </Link>
        </div>
      ) : (
        <div className="saved-items">
          <p>Your saved items will appear here</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
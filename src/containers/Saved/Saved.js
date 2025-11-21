import React, { useContext } from "react";
import { SavedContext } from "../../context/SavedContext";
import { Link } from "react-router-dom";

const Saved = () => {
  const { savedItems, increaseQty, decreaseQty, removeFromSaved } = useContext(SavedContext);

  if (savedItems.length === 0) {
    return (
      <div className="saved empty">
        <h2>Your Saved Collection is Empty</h2>
        <p>Start exploring the gallery and save your favorite furniture items for inspiration!</p>
        <Link to="/" className="btn back-btn">
          Browse Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="saved">
      <h2>Your Saved Furniture Collection</h2>

      <div className="saved-items">
        {savedItems.map((item) => (
          <div className="saved-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="details">
              <h3>{item.title}</h3>
              <p className="mod-info">From: {item.mod || "Various Mods"}</p>
              <p className="type-info">Type: {item.type || "Furniture"}</p>

              <div className="qty-controls">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>Quantity: {item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromSaved(item.id)}
              >
                Remove from Saved
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="saved-summary">
        <h3>Total Saved Items: {savedItems.reduce((sum, item) => sum + item.quantity, 0)}</h3>
        <p>Use these saved items as inspiration for your next Minecraft build!</p>
      </div>
    </div>
  );
};

export default Saved;
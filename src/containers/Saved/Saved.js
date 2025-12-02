import React, { useContext } from "react";
import { SavedContext } from "../../context/SavedContext";
import { Link } from "react-router-dom";
import './Saved.css'

const Saved = () => {
  const { savedItems, removeFromSaved } = useContext(SavedContext);

  if (!savedItems || savedItems.length === 0) {
    return (
      <div className="saved empty">
        <h2>Your Saved Mods</h2>
        <p>Start exploring the gallery and save your favorite furniture mods!</p>
        <Link to="/" className="btn back-btn">
          Browse Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="saved">
      <h2>Your Saved Mods</h2>

      <div className="saved-items">
        {savedItems.map((item) => (
          <div className="saved-item" key={item.id}>
            <div className="saved-image-frame">
              <img
                src={item.image}
                alt={item.title || item.name}
                className="saved-img"
              />
            </div>

            <div className="saved-details">
              <h3>{item.title || item.name}</h3>
              {item.mod && <p className="mod-info">From: {item.mod}</p>}
              {item.type && <p className="type-info">Type: {item.type}</p>}
            </div>

            <button className="remove-btn" onClick={() => removeFromSaved(item.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="saved-summary">
        <h3>{savedItems.length} mod(s) saved</h3>
        <p>Use this page as a simple bookmark list for your favorite furniture mods.</p>
      </div>
    </div>
  );
};

export default Saved;

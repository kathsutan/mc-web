import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SavedContext } from "../../context/SavedContext";
import './ProductDetail.css'

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToSaved } = useContext(SavedContext);
  const item = location.state?.item;

  if (!item) {
    return (
      <div className="product-detail-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Back to Gallery
        </button>
        <div className="error-message">
          <h2>Item not found</h2>
          <p>Try going back to the gallery and selecting an item again.</p>
        </div>
      </div>
    );
  }

  const handleSaveToFavorites = () => {
    addToSaved({
      id: item.id,
      title: item.name,
      image: item.image,
      mod: item.mod,
      type: item.type,
    });
  };

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Gallery
      </button>

      <div className="product-detail">
        <div className="product-image-section">
          <div className="large-item-frame">
            <img src={item.image} alt={item.name} className="product-image" />
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{item.name}</h1>

          <div className="product-meta">
            <span className="mod-badge">{item.mod}</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>
              {item.description ||
                "This mod adds various furniture and decorative blocks for your builds."}
            </p>
          </div>

          <div className="product-details">
            <div className="detail-group">
              <h4>Downloads</h4>
              <p>{item.downloads?.toLocaleString() ?? "Unknown"}</p>
            </div>

            <div className="detail-group">
              <h4>Mod Page</h4>
              <p>
                <a href={item.modUrl} target="_blank" rel="noopener noreferrer">
                  View on Modrinth
                </a>
              </p>
            </div>
          </div>

          <div className="action-buttons">
            <button className="minecraft-button primary" onClick={handleSaveToFavorites}>
              Save to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

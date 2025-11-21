import React from 'react';
import { useParams, Link } from 'react-router-dom';

const mockFurnitureData = [
  {
    id: 1,
    name: 'Modern Chair',
    mod: 'MrCrayfish Furniture Mod',
    type: 'Chairs',
    image: 'https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Modern+Chair',
    description: 'A sleek modern chair perfect for contemporary builds. This chair features clean lines and a comfortable design that will enhance any modern Minecraft home.',
    modRequirements: 'MrCrayfish Furniture Mod v7.0.0+',
    craftingRecipe: '6x Oak Planks, 2x Iron Ingot'
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const item = mockFurnitureData.find(item => item.id === parseInt(id));

  if (!item) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <h2>Item not found</h2>
          <Link to="/" className="minecraft-button">Back to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-button">← Back to Gallery</Link>
      
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
            <span className="type-badge">{item.type}</span>
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>
          
          <div className="product-details">
            <div className="detail-group">
              <h4>Mod Requirements</h4>
              <p>{item.modRequirements}</p>
            </div>
            
            <div className="detail-group">
              <h4>Crafting Recipe</h4>
              <p>{item.craftingRecipe}</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="minecraft-button primary">Save to Favorites</button>
            <button className="minecraft-button secondary">Get Building Inspiration</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
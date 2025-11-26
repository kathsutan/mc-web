import React from 'react';
import { Link } from 'react-router-dom';

const ItemFrame = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`} className="item-frame-link">
      <div className="item-frame">
        <div className="item-image-container">
          <img src={item.image} alt={item.name} className="item-image" />
        </div>
        <div className="item-info">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-mod">From: {item.mod}</p>
          <p className="item-type">{item.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemFrame;
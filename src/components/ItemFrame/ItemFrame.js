import React from "react";
import { Link } from "react-router-dom";
import "./ItemFrame.css";

const ItemFrame = ({ item }) => {
  return (
    <Link
      to={`/product/${item.id}`}
      state={{ item }}
      className="item-frame-link"
    >
      <div className="item-frame">
        <div className="item-image-container">
          <img src={item.image} alt={item.name} className="item-image" />
        </div>
        <div className="item-info">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-mod">By: {item.mod}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemFrame;

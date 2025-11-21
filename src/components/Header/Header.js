import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="minecraft-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo">
            <h1>Modded Minecraft Furniture</h1>
          </div>
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Gallery</Link>
          <Link to="/cart" className="nav-link">Saved Items</Link>
          <Link to="/inspiration" className="nav-link">Inspiration</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
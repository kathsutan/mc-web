import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <header className="minecraft-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Modded Minecraft Furniture</h1>
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Gallery</Link>
          <Link to="/inspiration" className="nav-link">Inspiration</Link>
          <Link to="/saved" className="nav-link">Saved</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
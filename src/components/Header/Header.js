import { Link } from "react-router-dom";
import { useContext } from "react";
import { SavedContext } from "../../context/SavedContext";

const Header = () => {
    // const {savedItems} = useContext(SavedContext)
    // const savedCount = savedItems.reduce((sum,item)=>sum + item.quantity, 0);

  return (
    <header className="minecraft-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Modded Minecraft Furniture</h1>
        </Link>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Gallery</Link>
          <Link to="/inspiration" className="nav-link">Inspiration</Link>
          <div className="saved-link">
            <Link to="/saved" className="nav-link">Bookmarked</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";
import ProductDetail from "./containers/ProductDetail/ProductDetail";
import Saved from "./containers/Saved/Saved";
import Inspiration from "./containers/Inspiration/Inspiration";
import "./App.css";
import { SavedProvider } from "./context/SavedContext";

function App() {
  return (
    <SavedProvider> {/* Updated provider */}
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/saved" element={<Saved />} /> {/* Updated route */}
              <Route path="/inspiration" element={<Inspiration />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SavedProvider>
  );
}

export default App;
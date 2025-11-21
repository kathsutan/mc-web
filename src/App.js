import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";
import ProductDetail from "./containers/ProductDetail/ProductDetail";
import Cart from "./containers/Cart/Cart";
import Inspiration from "./containers/Inspiration/Inspiration";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/inspiration" element={<Inspiration />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
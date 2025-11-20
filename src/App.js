import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./containers/Home/Home";
import ProductDetail from "./containers/ProductDetail/ProductDetail";
import Cart from "./containers/Cart/Cart";
import Payment from "./containers/Payment/Payment";
import PaymentSuccess from "./containers/Payment/PaymentSuccess";
import "./App.css";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </CartProvider>
  );
}

export default App;

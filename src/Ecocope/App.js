import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Home from "./Home";
import Cart from "./cart";
import Checkout from "./Checkout";
import Navigat from "./Navigat";
import AjouterProduit from './AjouterProduit';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import AdminOrders from "./AdminOrders";
import Footer from "./Footer"


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        [action.product.id]: {
          ...action.product,
          quantity: (state[action.product.id]?.quantity || 0) + 1
        }
      };
    case 'REMOVE_ITEM':
      const currentQuantity = state[action.product.id]?.quantity;
      if (currentQuantity > 1) {
        return {
          ...state,
          [action.product.id]: {
            ...action.product,
            quantity: currentQuantity - 1
          }
        };
      } else {
        const newState = { ...state };
        delete newState[action.product.id];
        return newState;
      }
    case 'RESET_CART':
      return {};
    default:
      return state;
  }
};

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, {});
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [produits, setProduits] = useState([]);

  const fetchProduits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProduits(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', product });
  const removeFromCart = (product) => dispatch({ type: 'REMOVE_ITEM', product });

  return (
    <Router>
      <div>
        {isLoggedIn && <Navigat cart={cart} setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} 
          />
          <Route path="/singup" element={<SignUpForm />} />
          <Route 
            path="/login" 
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route 
            path="/AjouterProduit" 
            element={<AjouterProduit fetchProduits={fetchProduits} />} 
          />
          <Route 
            path="/home" 
            element={
              <Home 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
                cart={cart} 
                produits={produits} 
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
              />
            } 
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/AdminOrders" element={ <AdminOrders />} />
          <Route path="/Footer" element={ <Footer />} />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
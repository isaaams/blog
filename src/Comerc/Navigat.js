import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


const Navigat = () => {
  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className='herder'>
      <nav className={`navbar navbar-expand-lg navbar-light    ${headerFixed ? "fixed-top shadow bg-light" : "bg-light"} py-2`}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src="shop.jpg" 
              alt="DGH Store Logo"
              className="me-2" 
              style={{ height: '50px', width: "80px" }}
            />
            <span className="fs-4 fw-bold text-danger">DGH</span>
            <span className="fs-4 fw-bold text-primary">.Store</span>
          </Link>
          
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark px-3" to="/">Accueil</Link>
              </li>
              { <li>
              <Link className="nav-link fw-semibold text-dark px-3" to="/cart">Panier</Link>
              </li>  }
           
            </ul>
            
            <div className="d-flex align-items-center gap-2">
              <Link 
                to="/singup" 
                className="btn btn-outline-primary rounded-pill px-4 fw-medium"
              >
                Se connecter
              </Link>
              <Link 
                to="/login" 
                className="btn btn-primary rounded-pill px-4 fw-medium shadow-sm"
              >
                Connexion
              </Link>
              <Link 
              to="/AjouterProduit"
              className="btn btn-primary rounded-pill px-4 fw-medium shadow-sm"
              >
                Ajouter Produit
              </Link>
              <Link 
              to="/AdminOrders"
              className="btn btn-primary rounded-pill px-4 fw-medium shadow-sm"
              >
                Liste de commandes
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigat;
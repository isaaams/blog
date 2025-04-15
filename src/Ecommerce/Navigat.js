import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



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
    <header>
      <nav className={`navbar navbar-expand-lg navbar-light ${headerFixed ? "fixed-top shadow bg-white" : "bg-light"} py-2`}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src="th.jpg" 
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
                <Link className="nav-link fw-semibold text-dark px-3" to="/">Home</Link>
              </li>
              {/* { <li>
              <Link className="nav-link fw-semibold text-dark px-3" to="/card">card</Link>
              </li> } */}
           
            </ul>
            
            <div className="d-flex align-items-center gap-2">
              <Link 
                to="/singup" 
                className="btn btn-outline-primary rounded-pill px-4 fw-medium"
              >
                Create Account
              </Link>
              <Link 
                to="/login" 
                className="btn btn-primary rounded-pill px-4 fw-medium shadow-sm"
              >
                Log in
              </Link>
              <Link 
              to="/AjouterProduit"
              >
                AddProduct
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigat;
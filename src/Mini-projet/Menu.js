
import React from "react";
import { Link } from "react-router-dom";
export default function Menu() {
    const handleLogout = () => {
        sessionStorage.removeItem("userLogin");
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  fixed-top">
            <div className="container-fluid">
                <h4  style={{color:"white"}}>
                    Application Cars
                </h4>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/Accueil" className="nav-link">
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AjouterCar" className="nav-link">
                                Ajouter  Car
                            </Link>
                        </li>
                    </ul>
                    <button
                        onClick={handleLogout}
                        className="btn btn-danger btn-sm"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </nav>
    );
}

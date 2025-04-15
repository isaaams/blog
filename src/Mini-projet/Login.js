
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!login || !password) {
            toast.error("Veuillez saisir un login et un mot de passe");
        } else if (login === "admin" && password === "1234") {
            sessionStorage.setItem("userLogin", login);
            toast.success("Connexion réussie");
            navigate("/Accueil");
        } else {
            toast.error("Erreur de login/mot de passe");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Login:</label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de Passe:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Connexion
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}


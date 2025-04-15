import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Login from "./Login";
import Accueil from "./Accueil";
import AjouterCar from "./AjouterCar";
import ListeCar from "./ListeCar";
import ModifierCar from "./ModifierCar";

function ProtectedRoute({ children }) {
    const isAuthenticated = sessionStorage.getItem("userLogin");
    return isAuthenticated ? children : <Navigate to="/" />;
}

export default function App() {
    return (
        <Router>
            
            <Routes>
                    <Route path="/" element={<Login />} />
                    <Route 
                    path="/Accueil" element={<ProtectedRoute><Accueil /></ProtectedRoute>}/>

                 <Route path="/AjouterCar" element={<AjouterCar />} />
                 <Route path="/ListeCar" element={<ListeCar />} />
                 <Route path="/ModifierCar/:id" element={<ModifierCar />} />
                </Routes>
         </Router>
    );
}


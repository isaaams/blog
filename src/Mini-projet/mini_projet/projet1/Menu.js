import React from "react";
import { Link } from "react-router-dom";
export default function Menu(){
    return(
        <div>
            <h3>la famell otman et guizi</h3>
            <ul>
            <li>
            <Link to="/">Accueil</Link>
            </li>
            <li>
            <Link to="/Ajouter">Ajouter</Link>
            </li>
            <li>
            <Link to="/modifier">modifier</Link>
            </li>
            </ul>
        </div>
    )
}
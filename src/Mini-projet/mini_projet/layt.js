import React from "react";
import { Link } from "react-router-dom";
export default function Lays(){
    return(
        <div>
            <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/Blogs">Blogs</Link>
            </li>
            <li>
            <Link to="/Contact">Contact</Link>
            </li>
            </ul>
        </div>
    )

}
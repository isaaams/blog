
import React from "react";
import Menu from "./Menu";
import ListeCar from "./ListeCar";

export default function Accueil() {
    const userLogin = sessionStorage.getItem("userLogin");

    if (!userLogin) {
        window.location.href = "/Accueil";
        return null;
    }

    return (
        <div>
            <Menu />
            <h2>Bienvenue, {userLogin}</h2>
            <hr />
            <ListeCar />
        </div>
    );
}


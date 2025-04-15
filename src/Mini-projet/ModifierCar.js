import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./Shop.json";
import Swal from "sweetalert2";
import Menu from "./Menu";

export default function ModifierCar() {
    const { id } = useParams();
    const produits = data.find((prod) => prod.id === parseInt(id));
    const [marque, setMarque] = useState(produits.marque); 
    const [model, setModel] = useState(produits.model); 
    const [year, setYear] = useState(produits.year); 
    const [prix, setPrix] = useState(produits.prix);
    const navigate = useNavigate();

    const handleUpdate = () => {
        produits.marque = marque;
        produits.model = model;
        produits.year = year;
        produits.prix = prix;
        Swal.fire({
            title: 'Succès!',
            text: 'Voiture modifiée avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        navigate("/ListeCar");
    };

    return (
        <div style={{margin:"50px"}} >
        <div>
        <Menu />
        </div>

        <h2>Modifier Car</h2>
        <form
        
            onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
            }}
        >
            <div >
                <label>Marque du Car:</label>
                <input
                    type="text"
                    value={marque}
                    onChange={(e) => setMarque(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <label>Model du Car:</label>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <label>Year du Car:</label>
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="form-control"
                />
            </div>
            <br />
            <div>
                <label>Prix du car:</label>
                <input
                    type="text"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    className="form-control"
                />
            </div>
            <br />
            <button type="submit" className="btn btn-primary"  onSubmit={handleUpdate}>
                Modifier
            </button>
        </form>
    </div>
    );
}


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./Shop.json";
import Swal from "sweetalert2";
import Menu from "./Menu";




export default function AjouterCar() {
    const [produits, setProduits] = useState(data); 
    const [marque, setMarque] = useState(""); 
    const [model, setModel] = useState(""); 
    const [year, setYear] = useState(""); 
    const [prix, setPrix] = useState(""); 
    const navigate = useNavigate();

    const handleAdd = () => {
        if (!marque || !model || !year|| !prix) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Veuillez remplir tous les champs.",
            });
            return;
        }

        const newProduit = { 
            id: produits.length + 1, 
            marque, 
            model,
            year,
            prix 
        };

        const updatedProduits = [...produits,produits.push (newProduit)];
        setProduits(updatedProduits);

        Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Produit ajouté avec succès!",
        }).then(() => {
            navigate("/ListeCar");
        });
    };

    return (
        <div style={{margin:"50px"}}>
           <div>
           <Menu />
           </div>
            <h2>Ajouter Car</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAdd();
                }}
            >
                <div>
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
                <button type="submit" className="btn btn-primary">
                    Ajouter
                </button>
            </form>
        </div>
    );
}

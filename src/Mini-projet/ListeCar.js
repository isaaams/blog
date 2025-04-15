
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import data from "./Shop.json";
import Menu from "./Menu";
import Accueil from "./Accueil";



export default function ListeProduit() {
    const [produits, setProduits] = useState(data);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Voulez-vous vraiment supprimer ce produit?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer", 
            cancelButtonText: "Non, annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedProduits = produits.filter((prod) => prod.id !== id);
                setProduits(updatedProduits);
                Swal.fire("Supprimé!", "Le produit a été supprimé.", "success");
            }
        });
    };

    return (
        <div className="container mt-4" style={{margin:"50px"}} >
            <div>
           <Menu />
           </div>
            <div>
            </div>
            <h2 className="text-center mb-4">List des Cars </h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Marque</th>
                        <th scope="col">Model</th>
                        <th scope="col">Year</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map((produit) => (
                        <tr key={produit.id}>
                            <th scope="row">{produit.id}</th>
                            <td>{produit.marque}</td>
                            <td>{produit.model}</td>
                            <td>{produit.year}</td>
                            <td>{produit.prix}$</td>
                            <td>
                                <Link  to={`/ModifierCar/${produit.id}`}  className="btn btn-warning btn-sm me-2"> Modifier</Link>
                                <button onClick={() => handleDelete(produit.id)} className="btn btn-danger btn-sm">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <Link  to={`/Accueil`}className="btn btn-primary btn-sm me-2">Go back</Link> */}

        </div>
    );
}


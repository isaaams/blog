
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import data from "./produit.json";
import Menu from "./Menu";
export default function Ajouter(){
    const[prod,setProd]=useState(data)
    const[nom,setNom]=useState("")
    const[prenom,setPrenom]=useState("")
    const[age,setAge]=useState("")
    const navigate = useNavigate();

    const handleAdd = () => {
        if (!nom || !prenom || !age) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Veuillez remplir tous les champs.",
            });
            return;
        }

        const newProduit = { 
            id: prod.length + 1, 
            nom, 
            prenom,
            age
            
        };

        const updatedProduits = [...prod,prod.push (newProduit)];
        setProd(updatedProduits);

        Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Produit ajouté avec succès!",
        }).then(() => {
            navigate("/");
        });
    };
     return(
        <div>
        <div>
            <Menu/>
        </div>
            <form onSubmit={(e)=>{e.preventDefault();handleAdd();}}>
                <label>le NOM</label>
                <input type="text" value={nom} onChange={(e)=>setNom(e.target.value)}></input>
                <label>le prenom</label>
                <input type="text" value={prenom} onChange={(e)=>setPrenom(e.target.value)}></input>
                <label> Age</label>
                <input type="text" value={age} onChange={(e)=>setAge(e.target.value)}></input>
                <button type="submit">Ajouter</button>
            </form>
        </div>
     )
}
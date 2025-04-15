
import { useState } from "react";
import data from "./produit.json";



export default function Leist(){
    const[prod,setProd]=useState(data)
    function Supprimer(id){
   
    var List=prod.filter((e)=>e.id!==id)
    setProd(List)
    }
    return(
        <div>
            
        <h1> wlad Otaman guizi </h1>
        <table>
        <tr>
        <th>nom</th>
        <th>prenom</th>
        <th>age</th>
        </tr>
           {prod.map((e)=>(
            
            <tr key={prod.id}>
                <td>{e["nom:"]}</td>
                <td>{e.prenom}</td>
                <td>{e.Age}</td>
                <td><button onClick={()=>Supprimer(e.id)}>supprimer</button></td>
            </tr>
           )
        )}
        </table>
        </div>
    )
}

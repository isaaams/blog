import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Menu from "./Menu";
import Leist from "./listEnfant";
import Ajouter from "./Ajouter";

export default function App(){
    return(
        <BrowserRouter>
         <Menu/>
        <Routes>
            <Route path="/" element={<Leist></Leist>}></Route>
            <Route path="/Ajouter" elament={<Ajouter></Ajouter>}></Route>
           
        </Routes>
        </BrowserRouter>
    )
}
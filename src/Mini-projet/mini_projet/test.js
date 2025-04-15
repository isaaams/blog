import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Lays from './layt'
export default function App(){
    return(
 <BrowserRouter>
    <Routes>
     <Route path="/" element={Lays}></Route>
    </Routes>
 </BrowserRouter>   
       )
}
    
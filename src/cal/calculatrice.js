import React from 'react'
import{useState}from 'react'
function Somme(){
    const[t1,setT1]=useState("")
    const[t2,setT2]=useState("")
    const[t3,setT3]=useState("")
    function calculer(e){
        e.preventDefault();
        const sum =parseInt(t1)+parseInt(t2);
       setT3(sum) 
    }
    return <>
    <h1>calculatrice</h1>
    <form>
        <input type="text" name="t1" value={t1} onChange={(e)=>{setT1(e.target.value)}}></input>
        +
        
        <input type="text" name="t2" value={t2} onChange={(e)=>{setT2(e.target.value)}}></input>
        =
        <input type="button" onClick={calculer}>calculatrice</input>
        <p>Résultat</p>
        <input type="text" name="t3" value={t3} onChange={(e)=>{setT3(e.target.value)}}></input>

    </form>
    </>
}export default Somme
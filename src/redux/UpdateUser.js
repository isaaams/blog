import{useParams}from "react-router-dom"
import{useDispatch,useSelector}from "react-redux"
import { updateUserAction } from "./Action"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
export default function UpdateUser(){
    const{id}=useParams()
    const user=useSelector(data=>data.users.find((u)=>u.id===parseInt(id)));
    const[name,setName]=useState(user.nom)
    const[email,setEmail]=useState(user.prenom)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleClick=()=>{
        dispatch(updateUserAction({
            id:id,
            nomm:name,
            prenom:email
        }))
        navigate('/')
    }
    return(
        <form>
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
            <label>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <button onClick={handleClick}>Enregistrer</button>
        </form>
    )

}
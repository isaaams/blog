import { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { addUserAction } from './Action';
import {useNavigate}from "react-router-dom";
export default function AddUser(){
    const count = useSelector(data=>data.users.length);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleClick=()=>{
        dispatch(addUserAction({
            id:count+1,
            nom:name,
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
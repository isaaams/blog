import { useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { deleteUserAction } from "./Action";
import { Link } from "react-router-dom";

export default function AddUserRedux() {
    const users =useSelector((state)=>state.users);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const dispatch =useDispatch();
    function handleDelete(id){
        dispatch(deleteUserAction(id))

    }
    return(
        <div>
            <p>
            <Link to="/add-user">
            <button>Add user</button>
            </Link>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>nom</th>
                        <th>prenom</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>{
                        return(
                            <tr key={index}>
                               <td>{user.id}</td>
                               <td>{user.nom}</td>
                               <td>{user.prenom}</td>
                               <td>
                                <Link to={`/upedate-user/${user.id}`}>
                                    <button>Edit</button>
                                </Link>
                               </td>
                               <td><button onClick={()=>handleDelete(user.id)}>Delete</button></td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
        }
import React from 'react'

import {useSelector, useDispatch } from 'react-redux'

import { Link } from "react-router-dom"
import {deleteUser} from './UserReducer'

function ListeUser(){

const users=useSelector((data)=>data.users);

console.log(users);

const dispatch = useDispatch();

function handleDelete(id){

    dispatch(deleteUser({id:id}))

}

return(<div className='container'><h2>Crud APP avec Redux Toolkit</h2>
     <p>
                <Link to="/add-user" className='btn btn-success my-3'>Create
                    
                </Link>
            </p>

<table className='table'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user, index)=> {
                            return (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td> 
                               
                                <Link to={`/update-user/${user.id}`}>
                                        <button className='btn btn-sm btn-primary'>Edit</button>
                                    </Link>
                                    
                                  </td>
                                    
                                  <td> <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user.id)}>Delete</button></td></tr>)})}</tbody>
</table>
                </div>
        






)

}
export default ListeUser;
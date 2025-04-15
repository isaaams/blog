import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { modifUser } from "./UserReducer"
import { useNavigate } from "react-router-dom";
import { useState } from "react"

function ModifierUser() {
    const {id} = useParams()

    const user = useSelector(data=>data.users.find((u)=>u.id===parseInt(id)));

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClick = () => {

        dispatch(modifUser({
            
            id:id,
            name:name,
            email:email
        }))
        navigate('/')
    }
    return (
        <div className="d-flex w-100 vh-100 justify-content align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
            <h3>Update User</h3>
        <form>
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"/>
            <label>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control"/>
            <button onClick={handleClick}  className="btn btn-info">Enregistrer</button>
        </form>
        </div></div>
    )
}
export default ModifierUser
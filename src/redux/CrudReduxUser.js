import { BrowserRouter,Routes,Route } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";
import AddUserRedux from "./UserRedux";
export default function CrudReduxUser(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AddUserRedux/>}></Route>
                <Route path="/add-user" element={<AddUser/>}></Route>
                <Route path="/update-user/id"element={<UpdateUser/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
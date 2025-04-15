import { BrowserRouter, Routes, Route } from 'react-router-dom';


import ListUser from './ListeUser'
import AddUser from './AjouterUser';
import ModifUser from './ModifierUser'



function RouteUser() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListUser />} />
         
          <Route path='/add-user' element={<AddUser />} />

          <Route path='/update-user/:id' element={<ModifUser />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default RouteUser;
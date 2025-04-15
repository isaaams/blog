import React from 'react';
import { BrowserRouter as  Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './Header';
import ListEmploye from './ListEmploye';
import AddEmploye from './AddEmploye';
import DetailEmploye from './DetailEmploye';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListEmploye />} />
        <Route path="/add" element={<AddEmploye />} />
        <Route path="/:nom" element={<DetailEmploye />} />
      </Routes>
      </BrowserRouter>
  );
};

export default App;












































$
%%
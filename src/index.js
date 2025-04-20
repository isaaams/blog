import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
// import Aa from './test/aa';
// import App from './mini projet/App';

// import App from './Mini-projet/App';
// import App from './cc2/App';
// import App from './Mini-projet/mini_projet/test';
// import Leist from './Mini-projet/mini_projet/projet1/listEnfant';
// import App from './Mini-projet/mini_projet/projet1/App';
// import CrudReduxUser from './redux/CrudReduxUser';
// import {Provider} from 'react-redux';
// import{legacy_createStore}from "redux";
// import reducer from './redux/Reducer';
// import RouteUser from './redux-toulkit/RouteUser';
// import Employee from './EFMREJIONAL/Emploiyee';
// const store=legacy_createStore(reducer)
// import Employee from './EFMREJIONAL/Emploiyee';
// import Somme from"./cal/calculatrice";
import App from './Ecocope/App';
// import App from './Comerc/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // <Provider store={store}>
  //   <RouteUser/>
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

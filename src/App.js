import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/Cadastro/cadastro.js';
import Login from './pages/Login/login.js';
import RecuperarSenha from './pages/RecuperarSenha/recuperar.js'
import Principal from './pages/TelaInicial/telainicial.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login></Login>}></Route>
        <Route path="/Cadastro" element={<Cadastro></Cadastro>}></Route>
        <Route path="/RecuperarSenha" element={<RecuperarSenha></RecuperarSenha>}></Route>
        <Route path="/MenuInicial" element={<Principal></Principal>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
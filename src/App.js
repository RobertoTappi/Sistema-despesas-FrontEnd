import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login/login.js';
import Cadastro from './pages/Cadastro/cadastro.js';
import RecuperarSenha from './pages/RecuperarSenha/recuperar.js'
import ChangePassword from './pages/RecuperarSenha/changepassword.js';
import PrivateRoutes from './pages/auth/PrivateRoute.js';
import TelaInicial from './pages/TelaInicial/telainicial.js'
import Contas from './pages/Configuracoes/contas.js'
import Categorias from './pages/Configuracoes/categorias.js';
import Lancamentos from './pages/Lançamentos/lancamentos.js';

function App() {

  return (

    <Router>
      <Routes>
        <Route element={<PrivateRoutes></PrivateRoutes>}>
          <Route path="/home" element={<TelaInicial></TelaInicial>} exact></Route>
          <Route path="/configuracoes/contas" element={<Contas></Contas>} exact></Route>
          <Route path="/configuracoes/categorias" element={<Categorias></Categorias>} exact></Route>
          <Route path="/lancamentos" element={<Lancamentos></Lancamentos>} exact></Route>

        </Route>

        <Route path="/RecuperarSenha" element={<RecuperarSenha></RecuperarSenha>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/Cadastro" element={<Cadastro></Cadastro>}></Route>
        <Route path="/resetPassword" element={<ChangePassword></ChangePassword>}></Route>
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>

  );
}

export default App;
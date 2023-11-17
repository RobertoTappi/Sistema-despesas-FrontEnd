import React from 'react';
import Login from './pages/Login/login.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cadastro from './pages/Cadastro/cadastro.js';
import RecuperarSenha from './pages/RecuperarSenha/recuperar.js'
import ChangePassword from './pages/RecuperarSenha/changepassword.js';
import PrivateRoutes from './pages/auth/PrivateRoute.js';

function App() {
  

  return (
    
      <Router>
        <Routes>
            <Route element={<PrivateRoutes></PrivateRoutes>}>
              <Route path="/RecuperarSenha" element={<RecuperarSenha></RecuperarSenha>}></Route>
            </Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/Cadastro" element={<Cadastro></Cadastro>}></Route>
              <Route path="/resetPassword" element={<ChangePassword></ChangePassword>}></Route>
        </Routes>
      </Router>
    
  );
}

export default App;
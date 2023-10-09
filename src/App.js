import React from 'react';
import Login from './pages/Login/login.js';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import RecuperarSenha from './pages/RecuperarSenha/recuperar.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Login></Login>}></Route>
          <Route path="/RecuperarSenha" element={<RecuperarSenha></RecuperarSenha>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
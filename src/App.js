import React from 'react';
import Login from './pages/Login/login.js';
import { BrowserRouter,Route,Routes} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
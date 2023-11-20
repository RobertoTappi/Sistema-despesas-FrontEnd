import { Outlet, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';


const PrivateRoutes = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [isValidToken, setIsValidToken] = useState(null);
  const token = localStorage.getItem('user')

  useEffect(() => {
    const checkTokenValidity = async () => {
      console.log(token)
      try {
        console.log(token)
        await axios.post("http://localhost:8080/api/user/validIsToken", { token });
        setIsValidToken(true);
        console.log("token valido")
      } catch (error) {
        setIsValidToken(false);
        console.log("token invalido")
      }
    };

    checkTokenValidity();
  }, [token]);



  if (isValidToken === null) {
    return <div>Verificando token...</div>;
  }

  // Renderiza o componente com base no resultado da validação
  return isValidToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes
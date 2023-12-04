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
      try {
        await axios.post("https://deploy-backendcoincontrol.onrender.com/api/user/validIsToken", { token });
        setIsValidToken(true);
      } catch (error) {
        setIsValidToken(false);
      }
    };

    checkTokenValidity();
  }, [token]);



  if (isValidToken === null) {
    return <div></div>;
  }

  // Renderiza o componente com base no resultado da validação
  return isValidToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes
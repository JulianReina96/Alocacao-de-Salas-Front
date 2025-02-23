import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver autenticado, renderize o componente filho
  return children;
};

export default ProtectedRoute;
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Corrigido para funcionar com React Router v6
const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token');

    // Se não houver token, redireciona para a página de login
    if (!token) {
        return <Navigate to="/auth" state={{ error: 'Faça o login para acessar esta página.' }} />;
    }

    // Se o token existir, renderiza o componente da rota
    return element;
};

export default PrivateRoute;

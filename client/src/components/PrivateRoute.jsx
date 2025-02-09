
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        
        return <Navigate to="/auth" state={{ error: 'Faça o login para acessar esta página.' }} />;
    }

    // Se o token existir, renderiza a rota desejada
    return <Route {...rest} element={element} />;
};

export default PrivateRoute;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import './css/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Verifica se o usuário está logado

    // 🚀 Função de logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token
        navigate('/auth'); // Redireciona para a tela de login
    };

    return (
        <AppBar position="static" className="navbar">
            <Toolbar className="navbar__toolbar">
                
                <Box className="navbar__menu">
                    <Button color="inherit" component={Link} to="/">Início</Button>
                    <Button color="inherit" component={Link} to="/home">Pesquisar Versículos</Button>
                    <Button color="inherit" component={Link} to="/verses">Versículos</Button>

                    {token ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button color="inherit" component={Link} to="/auth">Login</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

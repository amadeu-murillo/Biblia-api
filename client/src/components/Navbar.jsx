import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './css/Navbar.css';

const Navbar = () => {
    return (
        <AppBar position="static" className="navbar">
            <Toolbar className="navbar__toolbar">
                <Typography variant="h6" className="navbar__title">
                    
                </Typography>
                <Box className="navbar__menu">
                    <Button color="inherit" component={Link} to="/">Início</Button>
                    <Button color="inherit" component={Link} to="/home">Pesquisar versículos</Button>
                    <Button color="inherit" component={Link} to="/verses">Versículos</Button>
                    <Button color="inherit" component={Link} to="/auth">Login</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

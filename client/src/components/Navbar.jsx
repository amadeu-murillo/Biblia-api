// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__item"><Link to="/" className="navbar__link">Início</Link></li>
                <li className="navbar__item"><Link to="/verses" className="navbar__link">Versículos</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

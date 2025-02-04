import React from 'react';
import './css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Versículos da Bíblia. Todos os direitos reservados.</p>
            <p><a href="#contact" className="footer__link">Fale conosco</a></p>
        </footer>
    );
};

export default Footer;

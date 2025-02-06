import React from 'react';
import '../components/css/landing.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing">
        
            <header>
                
                    <p className="subtitle">Faça login e comece a explorar!</p>
                
                    <Button className="cta-button" component={Link} to="/auth">Comece Agora</Button>
                
            </header>
            <section className="features">
                <div className="feature">
                    <h2>Busca Inteligente</h2>
                    <p>Encontre versículos rapidamente com nossa ferramenta de busca.</p>
                </div>
                <div className="feature">
                    <h2>Favoritos</h2>
                    <p>Salve e compartilhe seus versículos preferidos.</p>
                </div>
                <div className="feature">
                    <h2>Exploração</h2>
                    <p>Descubra passagens inspiradoras recomendadas para você.</p>
                </div>
            </section>
            
        </div>
    );
};

export default LandingPage;

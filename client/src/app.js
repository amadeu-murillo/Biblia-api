import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import VerseList from './components/VerseList';
import SearchBar from './components/SearchBar';
import './components/css/app.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { fetchVerses } from './services/api';

// Import das páginas
import Verses from './pages/Verses';
import VerseView from './pages/VerseView';
import Sign from './pages/Sign';
import Home from './pages/LandingPage';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
    const [verses, setVerses] = useState([
        { reference: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' },
        { reference: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
    ]);

    // Busca de versículos
    const handleSearch = async (searchTerm) => {
        try {
            const data = await fetchVerses(searchTerm);
            setVerses(data || []); // Evita adicionar valores nulos
        } catch (error) {
            console.error('Erro ao buscar versículos:', error);
        }
    };

    return (
        <Provider store={store}> 
            <Router>
                <MainContent handleSearch={handleSearch} verses={verses} />
            </Router>
        </Provider> 
    );
};

const MainContent = ({ handleSearch, verses }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth'; // Verifica se está na página de login/cadastro

    return (
        <div className="app">
            {!isAuthPage && <Navbar />}  {/* Navbar oculta na página de autenticação */}
            {!isAuthPage && <Header />}  {/* Header também oculto na página de autenticação */}
            
            <Routes>
    <Route path="/" element={<Home />} />
    <Route 
        path="/home" 
        element={
            <>
                <SearchBar onSearch={handleSearch} />
                <VerseList verses={verses} />
            </>
        } 
    />
    <Route path="/verses" element={<Verses />} />
    <Route path="/view" element={<VerseView />} />
    <Route path="/auth" element={<Sign />} />
    <Route 
        path="*" 
        element={<div style={{ textAlign: 'center', margin: '20px' }}>404 - Página não encontrada</div>} 
    />
</Routes>

            
            {!isAuthPage && <Footer />} {/* Footer oculto na página de autenticação */}
        </div>
    );
};

export default App;

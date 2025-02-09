import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import VerseList from './components/VerseList';
import SearchBar from './components/SearchBar';
import './components/css/app.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { fetchVerses } from './services/api';
import Home from './pages/LandingPage';

// Import pages
import Verses from './pages/Verses';
import VerseView from './pages/VerseView';
import Sign from './pages/Sign';

// Redux Imports
import { Provider } from 'react-redux'; 
import store from './store'; 
import PrivateRoute from './components/PrivateRoute'; 

const App = () => {
    const [verses, setVerses] = useState([
        { reference: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' },
        { reference: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
    ]);

    // Função para buscar versículos na API
    const handleSearch = async (searchTerm) => {
        const data = [];
        data.push(await fetchVerses(searchTerm));
        setVerses(data); 
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
    const navigate = useNavigate();

    // 🚀 Função de logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token
        navigate('/auth'); // Redireciona para a tela de login
    };

    return (
        <div className="app">
            {/* Passando handleLogout para Navbar */}
            <Navbar handleLogout={handleLogout} />
            {location.pathname !== '/auth' && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Rota protegida */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute 
                            element={
                                <>
                                    <SearchBar onSearch={handleSearch} />
                                    <VerseList verses={verses} />
                                </>
                            } 
                        />
                    } 
                />
                <Route path="/verses" element={<Verses />} />
                <Route path="/view" element={<VerseView />} />
                <Route path="/auth" element={<Sign />} />
                <Route path="*" element={<div style={{ textAlign: 'center', margin: '20px' }}>404 - Página não encontrada</div>} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

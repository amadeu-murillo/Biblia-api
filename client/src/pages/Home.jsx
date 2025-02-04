import React, { useState } from 'react';
import Header from './components/Header';
import VerseList from './components/VerseList';
import SearchBar from './components/SearchBar';
import './components/css/app.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { fetchVerses } from './services/api';


const Home = () => {
    const [verses, setVerses] = useState([
        { reference: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' },
        { reference: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
        
    ]);

    // Função de busca que chama a API com o termo de busca
    const handleSearch = async (searchTerm) => {
        const data =  [];
        data.push(await fetchVerses(searchTerm));
        setVerses(data); // Atualiza o estado com os resultados da API
    };

    return (
        <div className="app">
            <Navbar />
            <Header />
            <SearchBar onSearch={handleSearch} />
            <VerseList verses={verses} />
            <Footer />
        </div>
    );
};

export default Home;

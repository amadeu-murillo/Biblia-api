import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import VerseList from './components/VerseList';
import SearchBar from './components/SearchBar';
import './components/css/app.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { fetchVerses } from './services/api';

// Import the Verses and VerseView pages
import Verses from './pages/Verses';
import VerseView from './pages/VerseView';
import Sign from './pages/Sign';

// Redux Imports
import { Provider } from 'react-redux'; // Import the Provider from React-Redux
import store from './store'; // Import the Redux store

const App = () => {
    const [verses, setVerses] = useState([
        { reference: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' },
        { reference: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
    ]);

    // Function to fetch verses based on a search term
    const handleSearch = async (searchTerm) => {
        const data = [];
        data.push(await fetchVerses(searchTerm));
        setVerses(data); // Update state with API results
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
    return (
        <div className="app">
            <Navbar />
            {location.pathname !== '/auth' && <Header />}
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <SearchBar onSearch={handleSearch} />
                            <VerseList verses={verses} />
                        </>
                    } 
                />
                {/* Verses page */}
                <Route path="/verses" element={<Verses />} />
                {/* View Verses page */}
                <Route path="/view" element={<VerseView />} />
                <Route 
                    path="*"
                    element={<div style={{ textAlign: 'center', margin: '20px' }}>404 - Page Not Found</div>} 
                />
                <Route path="/auth" element={<Sign/>} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

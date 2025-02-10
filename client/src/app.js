import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { VersesProvider } from "./components/VerseContext";
import SearchBar from "./components/SearchBar";
import VerseList from "./components/VerseList";

// Import pages
import Home from "./pages/LandingPage";
import Verses from "./pages/Verses";
import VerseView from "./pages/VerseView";
import Sign from "./pages/Sign";
import SearchByTag from "./pages/SearchByTag";
import PrivateRoute from "./components/PrivateRoute";

// Redux Imports
import { Provider } from "react-redux"; 
import store from "./store"; 

const App = () => {
    return (
        <Provider store={store}> 
            <Router>
                <VersesProvider> 
                    <MainContent />
                </VersesProvider>
            </Router>
        </Provider> 
    );
};

const MainContent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 🚀 Função de logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove o token
        navigate("/auth"); // Redireciona para a tela de login
    };

    return (
        <div className="app">
            <Navbar handleLogout={handleLogout} />
            {location.pathname !== "/auth" && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute 
                            element={
                                <>
                                    <SearchBar />
                                    <VerseList />
                                </>
                            } 
                        />
                    } 
                />
                <Route path="/tags" element={<PrivateRoute element={<SearchByTag />} />} />
                <Route path="/verses" element={<Verses />} />
                <Route path="/view" element={<VerseView />} />
                <Route path="/auth" element={<Sign />} />
                <Route path="*" element={<div style={{ textAlign: "center", margin: "20px" }}>404 - Página não encontrada</div>} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

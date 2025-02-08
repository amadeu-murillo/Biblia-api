import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import '../components/css/app.css';

const Sign = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const url = isRegister ? 'http://localhost:4000/auth/signup' : 'http://localhost:4000/auth/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao processar a requisição');
            }

            // Armazena o token no localStorage
            localStorage.setItem('token', data.token);
            console.log('Token recebido:', data.token);

            // Navega para o home após login/cadastro bem-sucedido
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="app">
            <Navbar />
            <Box className="container" sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center', mt: 5 }}>
                <Typography variant="h4" component="h1">
                    {isRegister ? 'Cadastrar' : 'Entrar'}
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Senha"
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                        {isRegister ? 'Cadastrar' : 'Entrar'}
                    </Button>
                </form>
                <Button sx={{ mt: 2 }} onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Já tem uma conta? Entrar' : 'Não tem uma conta? Cadastrar'}
                </Button>
            </Box>
            <Footer />
        </div>
    );
};

export default Sign;

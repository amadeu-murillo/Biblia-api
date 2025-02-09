import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

const Sign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.error) setError(location.state.error);
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa qualquer erro anterior

    const url = isRegister 
        ? 'http://localhost:4000/auth/signup' 
        : 'http://localhost:4000/auth/login';

    console.log("Enviando requisição para:", url);
    console.log("Dados enviados:", formData);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log("Resposta do servidor:", data);

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao processar a requisição');
        }

        // Armazena o token no localStorage
        localStorage.setItem('token', data.token);
        console.log('Token recebido:', data.token);

        // Navega para o home após login/cadastro bem-sucedido
        navigate('/home');
    } catch (err) {
        console.error("Erro no login:", err);
        setError(err.message);
    }
};


  return (
    <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center", mt: 5 }}>
      <Typography variant="h4">{isRegister ? "Cadastrar" : "Entrar"}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <TextField fullWidth label="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
        )}
        <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
        <TextField fullWidth label="Senha" type="password" name="senha" value={formData.senha} onChange={handleChange} required />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          {isRegister ? "Cadastrar" : "Entrar"}
        </Button>
      </form>
      <Button onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Já tem conta? Entrar" : "Criar conta"}</Button>
    </Box>
  );
};

export default Sign;

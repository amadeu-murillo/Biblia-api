import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

const Sign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      console.log('Registrando:', formData);
      // Adicione a lógica de registro aqui
    } else {
      console.log('Logando:', formData);
      // Adicione a lógica de login aqui
    }
    navigate('/dashboard');
  };

  return (
    <Box className="container" sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" component="h1">
        {isRegister ? 'Cadastrar' : 'Entrar'}
      </Typography>
      <form onSubmit={handleSubmit}>
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
          name="password"
          value={formData.password}
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
  );
};

export default Sign;

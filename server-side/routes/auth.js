const express = require('express');
const router = express.Router();
const User = require("../model/schema");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// Rota para criar um usuário (signup)
router.post("/signup", async (req, res) => {
    const { nome, email, senha } = req.body;
  
    try {
      // Verificar se o email já existe
      const usuarioExistente = await User.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }
  
      // Criar novo usuário
      const novoUsuario = new User({ nome, email, senha });
      await novoUsuario.save();
  
      // Gerar o JWT
      const token = jwt.sign(
        { id: novoUsuario._id, nome: novoUsuario.nome, email: novoUsuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expira em 1 hora
      );
  
      // Retornar o token para o usuário
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Rota para login (autenticação)
  router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      // Verificar se o email existe
      const usuario = await User.findOne({ email });
      if (!usuario) {
        return res.status(400).json({ error: "Email ou senha inválidos" });
      }
  
      // Verificar se a senha está correta
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(400).json({ error: "Email ou senha inválidos" });
      }
  
      // Gerar o JWT
      const token = jwt.sign(
        { id: usuario._id, nome: usuario.nome, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Retornar o token
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  module.exports = router;
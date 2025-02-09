const express = require('express');
const router = express.Router();
const User = require("../model/schema");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


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
  
  router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }
  
    try {
      const usuario = await User.findOne({ email });
      if (!usuario) {
        return res.status(400).json({ error: "Credenciais inválidas." });
      }
  
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(400).json({ error: "Credenciais inválidas." });
      }
  
      const token = jwt.sign(
        { id: usuario._id, nome: usuario.nome, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        token,
        usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
      });
    } catch (err) {
      console.error("Erro no login:", err);
      res.status(500).json({ error: "Erro no servidor." });
    }
  });
  
  module.exports = router;
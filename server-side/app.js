require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/schema"); // Modelo de usuário
const autenticar = require("./helper/auth");
const app = express();

// Configurações
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
const mongoURL = process.env.MONGO_URL;
console.log("\n\n\nMongourl-=-==-=: \n" +process.env.MONGO_URL)
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Rota para criar um usuário
app.post("/users", async (req, res) => {
  try {
    const novoUsuario = new User(req.body);
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para listar usuários
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Rota para criar um usuário (signup)
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

// Exemplo de rota protegida
app.get("/perfil", autenticar, async (req, res) => {
  const usuario = await User.findById(req.usuario.id); // O ID vem do token
  res.json({ nome: usuario.nome, email: usuario.email });
});



// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

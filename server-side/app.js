require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/schema"); // Importa o modelo de usuário

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

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

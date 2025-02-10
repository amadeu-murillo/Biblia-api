require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/schema"); // Modelo de usuário
const autenticar = require("./helper/auth");
const authRouter = require("./routes/auth");
const listarUser = require("./routes/listarUser");
const tagRouter = require("./routes/tags")
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
 
  
/**Rotas para cadastro login e listar usuarios */
//rota para login e cadastro
app.use("/auth", authRouter);
//rota para listar os usuários
app.use("/listarUser",listarUser);
//rota para tags 
app.use("/", tagRouter);

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
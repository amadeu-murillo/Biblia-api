require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Configurações
app.use(express.json()); // Permite JSON no body das requisições
app.use(cors()); // Habilita CORS para todas as origens

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

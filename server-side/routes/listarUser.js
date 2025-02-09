const express = require("express");
const User = require("../model/schema"); // Importa o modelo de usuário
const router = express.Router();

// Rota para listar usuários
router.get("/listar", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

module.exports = router;

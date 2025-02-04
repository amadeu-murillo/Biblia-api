const mongoose = require("mongoose");

// Definição do Schema do usuário
const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Criar e exportar o modelo
module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Definição do Schema do usuário
const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }, // Senha do usuário
});

// Método para criptografar a senha antes de salvar
UserSchema.pre("save", async function(next) {
  if (!this.isModified("senha")) return next(); // Se a senha não foi modificada, não faz nada
  const salt = await bcrypt.genSalt(10); // Gera o salt
  this.senha = await bcrypt.hash(this.senha, salt); // Criptografa a senha
  next();
});

// Criar e exportar o modelo
module.exports = mongoose.model("User", UserSchema);

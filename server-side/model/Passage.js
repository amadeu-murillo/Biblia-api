const mongoose = require("mongoose");

const PassageSchema = new mongoose.Schema({
  trecho: { type: String, required: true, unique: true }, // Exemplo: "1JO 2:2"
  descricao: { type: String, required: true, unique: true }, // Exemplo: "1 João 2:2"
  texto:  { type: String, required: true, unique: false }, // Exemplo: "E ele é a propiciação pelos nossos pecados, e não somente pelos nossos, mas também pelos de todo o mundo."
  traducao: { type: String, required: true, unique: false }, // Exemplo: "João Ferreira de Almeida"
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], // Relacionamento com as tags
});

module.exports = mongoose.model("Passage", PassageSchema);

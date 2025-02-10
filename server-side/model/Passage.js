const mongoose = require("mongoose");

const PassageSchema = new mongoose.Schema({
  trecho: { type: String, required: true, unique: true }, // Exemplo: "1JO 2:2"
  descricao: { type: String, required: true, unique: true }, // Exemplo: "1 João 2:2"
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], // Relacionamento com as tags
});

module.exports = mongoose.model("Passage", PassageSchema);

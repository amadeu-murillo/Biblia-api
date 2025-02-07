const mongoose = require("mongoose");

const PassageSchema = new mongoose.Schema({
  trecho: { type: String, required: true, unique: true }, // Exemplo: "Jo 2:2-12"
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], // Relacionamento com as tags
});

module.exports = mongoose.model("Passage", PassageSchema);

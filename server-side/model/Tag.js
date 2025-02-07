const TagSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }, // Exemplo: "amor", "paz"
  passagens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Passage" }], // Relacionamento com passagens
});

module.exports = mongoose.model("Tag", TagSchema);

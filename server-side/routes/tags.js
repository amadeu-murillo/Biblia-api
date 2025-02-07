const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");
const Passage = require("../models/Passage");

// Criar uma nova tag e associar a uma passagem
router.post("/tag", async (req, res) => {
  try {
    const { trecho, nomeTag } = req.body;

    // Verifica se a passagem já existe, se não, cria
    let passage = await Passage.findOne({ trecho });
    if (!passage) {
      passage = await Passage.create({ trecho });
    }

    // Verifica se a tag já existe, se não, cria
    let tag = await Tag.findOne({ nome: nomeTag });
    if (!tag) {
      tag = await Tag.create({ nome: nomeTag });
    }

    // Adiciona a tag à passagem, se ainda não estiver associada
    if (!passage.tags.includes(tag._id)) {
      passage.tags.push(tag._id);
      await passage.save();
    }

    // Adiciona a passagem à tag, se ainda não estiver associada
    if (!tag.passagens.includes(passage._id)) {
      tag.passagens.push(passage._id);
      await tag.save();
    }

    res.status(201).json({ message: `Tag "${nomeTag}" associada a "${trecho}"` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todas as tags
router.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find().populate("passagens");
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar passagens por uma tag específica
router.get("/tags/:nomeTag", async (req, res) => {
  try {
    const tag = await Tag.findOne({ nome: req.params.nomeTag }).populate("passagens");
    if (!tag) return res.status(404).json({ message: "Tag não encontrada." });

    res.json(tag.passagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma tag (alterar seu nome)
router.put("/tags/:id", async (req, res) => {
  try {
    const { nome } = req.body;
    const tag = await Tag.findByIdAndUpdate(req.params.id, { nome }, { new: true });
    if (!tag) return res.status(404).json({ message: "Tag não encontrada." });

    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remover uma tag e desvinculá-la das passagens
router.delete("/tags/:id", async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag não encontrada." });

    // Remove a tag das passagens associadas
    await Passage.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });

    // Remove a tag do banco de dados
    await Tag.findByIdAndDelete(req.params.id);

    res.json({ message: "Tag removida com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

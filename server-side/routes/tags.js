const express = require("express");
const router = express.Router();
const Tag = require("../model/Tag");
const Passage = require("../model/Passage");
const autenticar = require("../helper/auth"); // Middleware de autenticação

// Criar uma nova tag e associar a uma passagem (PROTEGIDA)
router.post("/tag", autenticar, async (req, res) => {
  try {
    const { trecho, nomeTag } = req.body;

    let passage = await Passage.findOne({ trecho });
    if (!passage) {
      passage = await Passage.create({ trecho });
    }

    let tag = await Tag.findOne({ nome: nomeTag });
    if (!tag) {
      tag = await Tag.create({ nome: nomeTag });
    }

    if (!passage.tags.includes(tag._id)) {
      passage.tags.push(tag._id);
      await passage.save();
    }

    if (!tag.passagens.includes(passage._id)) {
      tag.passagens.push(passage._id);
      await tag.save();
    }

    res.status(201).json({ message: `Tag "${nomeTag}" associada a "${trecho}"` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todas as tags (PROTEGIDA)
router.get("/tags", autenticar, async (req, res) => {
  try {
    const tags = await Tag.find().populate("passagens");
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar passagens por uma tag específica (PÚBLICA)
router.get("/tags/:nomeTag", async (req, res) => {
  try {
    const tag = await Tag.findOne({ nome: req.params.nomeTag }).populate("passagens");
    if (!tag) return res.status(404).json({ message: "Tag não encontrada." });

    res.json(tag.passagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma tag (PROTEGIDA)
router.put("/tags/:id", autenticar, async (req, res) => {
  try {
    const { nome } = req.body;
    const tag = await Tag.findByIdAndUpdate(req.params.id, { nome }, { new: true });
    if (!tag) return res.status(404).json({ message: "Tag não encontrada." });

    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remover uma tag (PROTEGIDA)
router.delete("/tags/:id", autenticar, async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag não encontrada." });

    await Passage.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });
    await Tag.findByIdAndDelete(req.params.id);

    res.json({ message: "Tag removida com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

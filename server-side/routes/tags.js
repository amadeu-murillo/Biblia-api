const express = require("express");
const router = express.Router();
const Tag = require("../model/Tag");
const Passage = require("../model/Passage");
const autenticar = require("../helper/auth"); // Middleware de autenticação

// Criar uma nova tag e associar a uma passagem (PROTEGIDA)
router.post("/tag", autenticar, async (req, res) => {
  try {
    let { trecho, descricao, nomeTag } = req.body;

    // Normalizar a tag: remover espaços extras e forçar minúsculas
    nomeTag = nomeTag.trim().toLowerCase();

    if (!trecho || !nomeTag) {
      return res.status(400).json({ error: "Trecho e nome da tag são obrigatórios." });
    }

    // Procurar a passagem no banco, criar se não existir
    let passage = await Passage.findOne({ trecho });
    if (!passage) {
      passage = await Passage.create({ trecho, descricao });
    }

    // Procurar a tag no banco, criar se não existir
    let tag = await Tag.findOne({ nome: nomeTag });
    if (!tag) {
      tag = await Tag.create({ nome: nomeTag });
    }

    // Adicionar a tag à passagem se ainda não estiver associada
    if (!passage.tags.includes(tag._id)) {
      passage.tags.push(tag._id);
      await passage.save();
    }

    // Adicionar a passagem à tag se ainda não estiver associada
    if (!tag.passagens.includes(passage._id)) {
      tag.passagens.push(passage._id);
      await tag.save();
    }

    return res.status(201).json({
      message: `Tag "${nomeTag}" associada à passagem "${trecho}" com sucesso.`,
      passage,
      tag,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

// Retorna as tags associadas a uma passagem específica (PÚBLICA)
router.get("/passages/:trecho/tags", async (req, res) => {
  try {
    const { trecho } = req.params;

    // Buscar a passagem e popular suas tags
    const passage = await Passage.findOne({ trecho }).populate("tags");

    if (!passage) {
      return res.status(404).json({ message: "Passagem não encontrada." });
    }

    return res.json({ trecho: passage.trecho, tags: passage.tags });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

// Remove uma tag específica de uma passagem (PROTEGIDA)
router.delete("/passages/:trecho/tags/:tagId", autenticar, async (req, res) => {
  try {
    const { trecho, tagId } = req.params;

    const passage = await Passage.findOne({ trecho });
    if (!passage) return res.status(404).json({ message: "Passagem não encontrada." });

    const tag = await Tag.findById(tagId);
    if (!tag) return res.status(404).json({ message: "Tag não encontrada." });

    // Remover a tag da passagem
    passage.tags = passage.tags.filter((id) => id.toString() !== tagId);
    await passage.save();

    // Remover a passagem da tag
    tag.passagens = tag.passagens.filter((id) => id.toString() !== passage._id.toString());
    await tag.save();

    return res.json({ message: `Tag removida da passagem "${trecho}".` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;

const User = require("../model/schema");
const Passage = require("../model/Passage");
const Tag = require("../model/Tag");

const populateDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    const passageCount = await Passage.countDocuments();
    const tagCount = await Tag.countDocuments();

    // Criar usuário inicial
    if (userCount === 0) {
      const newUser = new User({
        nome: "Admin",
        email: "admin@email.com",
        senha: "123456", // Será criptografada automaticamente pelo pre-save hook
      });
      await newUser.save();
      console.log("✅ Usuário inicial criado!");
    } else {
      console.log("🔹 Usuário já existe, pulando criação.");
    }

    // Criar tags iniciais
    let tagAmor, tagFe, tagEsperanca;
    if (tagCount === 0) {
      tagAmor = new Tag({ nome: "amor" });
      tagFe = new Tag({ nome: "fé" });
      tagEsperanca = new Tag({ nome: "esperança" });

      await Tag.insertMany([tagAmor, tagFe, tagEsperanca]);
      console.log("✅ Tags iniciais criadas!");
    } else {
      console.log("🔹 Tags já existem, pulando criação.");
      
      // Buscar tags existentes
      const tags = await Tag.find();
      tagAmor = tags.find((tag) => tag.nome === "amor");
      tagFe = tags.find((tag) => tag.nome === "fé");
      tagEsperanca = tags.find((tag) => tag.nome === "esperança");
    }

    // Criar passagens e associar às tags
    if (passageCount === 0) {
      const passage1 = new Passage({
        trecho: "1JO 4:8",
        descricao: "1 João 4:8",
        texto: "Aquele que não ama não conhece a Deus; porque Deus é amor.",
        traducao: "João Ferreira de Almeida",
        tags: tagAmor ? [tagAmor._id] : [],
      });

      const passage2 = new Passage({
        trecho: "HEB 11:1",
        descricao: "Hebreus 11:1",
        texto: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
        traducao: "João Ferreira de Almeida",
        tags: tagFe ? [tagFe._id] : [],
      });

      await Passage.insertMany([passage1, passage2]);
      console.log("✅ Passagens iniciais criadas!");

      // 🔗 Associar passagens às tags
      if (tagAmor) {
        tagAmor.passagens.push(passage1._id);
        await tagAmor.save();
      }
      if (tagFe) {
        tagFe.passagens.push(passage2._id);
        await tagFe.save();
      }
    } else {
      console.log("🔹 Passagens já existem, pulando criação.");
    }
  } catch (error) {
    console.error("❌ Erro ao popular o banco de dados:", error);
  }
};

module.exports = populateDatabase;

import { useState } from "react";
import { useVerses } from "./VerseContext"; // Agora acessamos os versículos globais
import "./css/TagBt.css"; 

const AddTag = () => {
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const { versesData } = useVerses(); // Recupera os dados do contexto

  console.log(versesData);
  // Pega o trecho do versículo salvo no contexto
  const descricao = versesData?.reference || "";       
  const trecho = versesData.verses[0].book_id + " " + versesData.verses[0].chapter + " " + versesData.verses[0].verse;
  const texto = versesData.text;
  const traducao = versesData.translation_name; 

  const handleAddTag = async () => {
    if (!tag.trim() || !trecho) return;

    try { // Requisição para armazenar as tags no servidor
      const response = await fetch("http://localhost:4000/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ trecho, descricao, texto, traducao, nomeTag: tag }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Tag "${tag}" adicionada!`);
        setTag("");
      } else {
        setMessage(`Erro: ${data.error}`);
      }
    } catch (error) {
      setMessage("Erro ao adicionar tag.");
    }
  };

  return (
    <div className="add-tag-container">
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Digite uma tag"
        className="add-tag-input"
      />
      <button onClick={handleAddTag} className="add-tag-button">
        Adicionar Tag
      </button>
      {message && <p className="add-tag-message">{message}</p>}
    </div>
  );
};

export default AddTag;

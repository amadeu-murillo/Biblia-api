import { useState } from "react";
import "./css/TagBt.css"; 

const AddTag = ({ trecho }) => {
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");

  const handleAddTag = async () => {
    if (!tag.trim()) return;

    try {
      const response = await fetch("http://localhost:4000/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Se precisar de autenticação
        },
        body: JSON.stringify({ trecho, nomeTag: tag }),
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

import { useState } from "react";
import "./css/SearchByTag.css";

const SearchByTag = () => {
  const [tag, setTag] = useState("");
  const [passages, setPassages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    setErrorMessage(""); // Resetando erro antes da nova busca
    
    // Normalizando a tag: removendo espaços extras e convertendo para minúsculas
    const normalizedTag = tag.trim().toLowerCase().replace(/\s+/g, "-");
    try {
      setErrorMessage(""); // Resetando erro antes da nova busca
      const response = await fetch(`http://localhost:4000/tags/${normalizedTag}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar passagens");
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setPassages(data);
      } else {
        setPassages([]);
        setErrorMessage("Nenhum versículo encontrado para esta tag.");
      }
    } catch (error) {
      console.error("Erro ao buscar passagens:", error);
      setPassages([]);
      setErrorMessage("Erro ao buscar passagens. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="search-tag">
      <header className="search-tag__header">
        <h1 className="search-tag__title">Pesquise por uma palavra-chave</h1>
      </header>

      <div className="search-tag__form">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Digite a tag"
          className="search-tag__input"
        />
        <button onClick={handleSearch} className="search-tag__button">
          Buscar
        </button>
      </div>

      {errorMessage ? (
        <p className="search-tag__message">{errorMessage}</p>
      ) : (
        <ul className="search-tag__list">
          {passages.map((passage, index) => (
            <li key={index}>
              <div>
                <p><strong>{passage.descricao}</strong></p>
                <p>{passage.texto}</p>
                <p>{passage.traducao}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchByTag;

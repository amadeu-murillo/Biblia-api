import { useState } from "react";
import "./css/SearchByTag.css";

const SearchByTag = () => {
  const [tag, setTag] = useState("");
  const [passages, setPassages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tags/${tag}`);
      const data = await response.json();
      setPassages(data);
    } catch (error) {
      console.error("Erro ao buscar passagens:", error);
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

      <ul className="search-tag__list">
        {passages.map((passage, index) => (
          <li key={index}>{passage.trecho}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchByTag;

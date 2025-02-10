import { useState } from "react";

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
    <div>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Digite a tag"
      />
      <button onClick={handleSearch}>Buscar</button>

      <ul>
        {passages.map((passage, index) => (
          <li key={index}>{passage.trecho}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchByTag;

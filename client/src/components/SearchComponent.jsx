import { useState } from "react";
import { useFetchVerses } from "./VersesContext";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const fetchVerses = useFetchVerses(); // Usa o hook customizado

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      await fetchVerses(searchTerm); // Busca e armazena no contexto
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Digite um versículo (ex: João 3:16)"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchComponent;

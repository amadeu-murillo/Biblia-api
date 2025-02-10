import { createContext, useContext, useState } from "react";
import { fetchVerses } from "../services/api"; // Importa a função de busca

const VersesContext = createContext();

export const VersesProvider = ({ children }) => {
  const [versesData, setVersesData] = useState(null);

  return (
    <VersesContext.Provider value={{ versesData, setVersesData }}>
      {children}
    </VersesContext.Provider>
  );
};

// Hook para acessar os versículos globalmente
export const useVerses = () => useContext(VersesContext);

// Hook customizado para buscar versículos e salvar no contexto
export const useFetchVerses = () => {
  const { setVersesData } = useVerses();

  return async (searchTerm) => {
    const data = await fetchVerses(searchTerm);
    if (data) {
      setVersesData(data); // Atualiza globalmente
    }
    return data;
  };
};

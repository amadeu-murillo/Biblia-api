export const fetchVerses = async (searchTerm = "") => {
    try {
      let response = await fetch(`https://bible-api.com/${searchTerm}?translation=almeida`);
      
      if (!response.ok) {
        console.warn("Tradução 'Almeida' não encontrada");
        response = await fetch(`https://bible-api.com/${searchTerm}`);
      }
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data; // Apenas retorna os dados, sem atualizar o contexto
      } else {
        console.error("Erro ao buscar versículo");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar versículos:", error);
      return null;
    }
  };
  
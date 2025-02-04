export const fetchVerses = async (searchTerm = '') => {
    try {
        let response = await fetch(`https://bible-api.com/${searchTerm}?translation=almeida`);
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            // Segunda tentativa sem a tradução "almeida"
            console.warn("Tradução 'Almeida' não encontrada");
            response = await fetch(`https://bible-api.com/${searchTerm}`);
            
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Erro ao buscar versículo sem tradução:');
                return [];
            }
        }
    } catch (error) {
        console.error('Erro ao buscar versículos:', error);
        return [];
    }
};

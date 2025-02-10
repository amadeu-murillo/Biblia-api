import React from 'react';
import './css/VerseList.css';
import { useVerses } from "./VerseContext";
import AddTag from "./TagBt";

const VerseList = ({ verses }) => {
    const { versesData } = useVerses(); // Obtendo os versículos do contexto

    if (!versesData) return <p className="verse-list__empty">Nenhum versículo encontrado</p>;


    return (
        <div className="verse-list">
            <h2>Versículos Encontrados:</h2>
            <p><strong>{versesData.reference}</strong></p>
            <p>{versesData.text}</p>
            <AddTag />
        </div>
    );
};

export default VerseList;
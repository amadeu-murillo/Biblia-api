import React from 'react';
import VerseItem from './VerseItem';
import './css/VerseList.css';

const VerseList = ({ verses }) => {
    if (!verses || verses.length === 0 || !verses[0].reference) {
        return <p className="verse-list__empty">Nenhum versículo encontrado.</p>;
    }

    return (
        <div className="verse-list">
            {verses.map((verse, index) => (
                <VerseItem key={index} verse={verse} />
            ))}
        </div>
    );
};

export default VerseList;

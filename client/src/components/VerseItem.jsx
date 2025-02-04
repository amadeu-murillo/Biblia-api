import React from 'react';
import './css/VerseItem.css';

const VerseItem = ({ verse }) => (
    <div className="verse-item">
        <p className="verse-item__reference">{verse.reference}</p>
        <p className="verse-item__text">{verse.text}</p>
    </div>
);

export default VerseItem;

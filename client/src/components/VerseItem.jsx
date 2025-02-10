import React from 'react';
import './css/VerseItem.css';
import AddTag from "../components/TagBt";

const VerseItem = ({ verse }) => (
    <div>
        <div className="verse-item">
            <p className="verse-item__reference">{verse.reference}</p>
            <p className="verse-item__text">{verse.text}</p>
        </div>
        <AddTag/>
    </div>
);

export default VerseItem;

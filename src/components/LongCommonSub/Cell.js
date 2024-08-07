import React from 'react';
import './Cell.css';

const Cell = ({ value }) => {
    return (
        <td className="cell">{value}</td>
    );
};

export default Cell;
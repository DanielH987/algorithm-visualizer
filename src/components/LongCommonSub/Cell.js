import React from 'react';
import './Cell.css';

const Cell = ({ value, onChange, rowIndex, cellIndex }) => {
    const handleChange = (e) => {
        onChange(rowIndex, cellIndex, e.target.value);
    };

    return (
        <td className="cell">
            {rowIndex > 1 && cellIndex > 1 ? (
                <input
                    type="number"
                    value={value || ''}
                    onChange={handleChange}
                    className="number-input"
                />
            ) : (
                value
            )}
        </td>
    );
};

export default Cell;

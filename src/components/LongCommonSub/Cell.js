import React, { useState, useEffect } from 'react';
import './Cell.css';

const Cell = ({ 
    value, 
    onChange, 
    rowIndex, 
    cellIndex, 
    disabled, 
    highlight, 
    children,
}) => {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(rowIndex, cellIndex, newValue);
    };

    return (
        <td className={`cell ${highlight ? 'highlight' : ''} ${disabled ? 'disabled' : ''}`}>
            {rowIndex > 1 && cellIndex > 1 ? (
                <div className="input-dropdown-container">
                    {inputValue !== '' && children}
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                        className={`number-input ${inputValue !== '' ? 'filled' : ''} ${highlight ? 'highlight' : ''}`}
                        disabled={disabled}
                    />
                </div>
            ) : (
                value
            )}
        </td>
    );
};

export default Cell;

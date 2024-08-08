import React, { useState } from 'react';
import Select from 'react-select';
import './Cell.css';
import { GoArrowUpLeft, GoArrowUp, GoArrowLeft } from 'react-icons/go';

const Cell = ({ value, onChange, rowIndex, cellIndex }) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [isIconSelected, setIsIconSelected] = useState(false);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(rowIndex, cellIndex, newValue);
    };

    const handleSelectChange = (selectedOption) => {
        setIsIconSelected(!!selectedOption); // Check if an icon is selected
        console.log(`Selected: ${selectedOption?.value}`);
    };

    const dropdownOptions = [
        { value: 'upleft', label: <GoArrowUpLeft /> },
        { value: 'up', label: <GoArrowUp /> },
        { value: 'left', label: <GoArrowLeft /> }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            minHeight: '30px',
            height: '50px',
            width: '225px',
            boxShadow: 'none',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            display: isIconSelected ? 'none' : 'flex',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: isIconSelected ? 'none' : 'flex',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
    };

    return (
        <td className="cell">
            {rowIndex > 1 && cellIndex > 1 ? (
                <div className="input-dropdown-container">
                    {inputValue && (
                        <Select
                            options={dropdownOptions}
                            onChange={handleSelectChange}
                            className="dropdown"
                            styles={customStyles}
                            isClearable={false}
                            isSearchable={false}
                            placeholder=""
                        />
                    )}
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                        className="number-input"
                    />
                </div>
            ) : (
                value
            )}
        </td>
    );
};

export default Cell;

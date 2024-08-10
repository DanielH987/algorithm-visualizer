import { GoArrowUpLeft, GoArrowUp, GoArrowLeft } from 'react-icons/go';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Cell.css';

const Cell = ({ 
    value, 
    onChange, 
    rowIndex, 
    cellIndex, 
    disabled, 
    selectValue, 
    highlight,
}) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isIconSelected, setIsIconSelected] = useState(false);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        if (selectValue) {
            const option = dropdownOptions.find(opt => opt.value === selectValue);
            setSelectedOption(option);
            setIsIconSelected(!!option);
        }
    }, [selectValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(rowIndex, cellIndex, newValue);
    };

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setIsIconSelected(!!selectedOption);
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
            width: '25px',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            display: isIconSelected ? 'none' : 'flex',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            display: isIconSelected ? 'none' : 'flex',
            padding: '0',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0',
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
        }),
        menu: (provided) => ({
            ...provided,
            width: '50px',
        }),
        menuList: (provided) => ({
            ...provided,
            width: '50px',
        }),
    };

    return (
        <td className={`cell ${highlight ? 'highlight' : ''} ${disabled ? 'disabled' : ''}`}>
            {rowIndex > 1 && cellIndex > 1 ? (
                <div className="input-dropdown-container">
                    {inputValue !== '' && (
                        <Select
                            options={dropdownOptions}
                            onChange={handleSelectChange}
                            className="dropdown"
                            styles={customStyles}
                            isClearable={false}
                            isSearchable={false}
                            placeholder=""
                            isDisabled={disabled}
                            value={selectedOption}
                        />
                    )}
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                        className={`number-input ${inputValue !== '' ? 'filled' : ''}`}
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

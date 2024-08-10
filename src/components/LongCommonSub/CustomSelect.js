import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { GoArrowUpLeft, GoArrowUp, GoArrowLeft } from 'react-icons/go';

const CustomSelect = ({ selectValue, disabled }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isIconSelected, setIsIconSelected] = useState(false);

    const dropdownOptions = [
        { value: 'upleft', label: <GoArrowUpLeft /> },
        { value: 'up', label: <GoArrowUp /> },
        { value: 'left', label: <GoArrowLeft /> }
    ];

    useEffect(() => {
        if (selectValue) {
            const option = dropdownOptions.find(opt => opt.value === selectValue);
            setSelectedOption(option);
            setIsIconSelected(!!option);
        }
    }, [selectValue]);

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setIsIconSelected(!!selectedOption);
    };

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
    );
};

export default CustomSelect;

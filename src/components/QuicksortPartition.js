import React, { useState, useEffect } from 'react';
import Box from './Box';

const generateRandomArray = () => {
    const array = [];
    while (array.length < 15) {
        const randomInt = Math.floor(Math.random() * 21);
        if (!array.includes(randomInt)) {
            array.push(randomInt);
        }
    }
    return array;
};

const QuicksortPartition = () => {
    const [randomArray, setRandomArray] = useState([]);
    const [originalArray, setOriginalArray] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    useEffect(() => {
        const array = generateRandomArray();
        setRandomArray(array);
        setOriginalArray(array);
    }, []);

    const moveBox = (fromIndex, toIndex) => {
        const updatedArray = [...randomArray];
        [updatedArray[fromIndex], updatedArray[toIndex]] = [updatedArray[toIndex], updatedArray[fromIndex]];
        setRandomArray(updatedArray);
        setHighlightedIndex(null); // Reset highlight after drop
    };

    const handleDragOver = (index) => {
        setHighlightedIndex(index);
    };

    const handleDragLeave = () => {
        setHighlightedIndex(null);
    };

    return (
        <div>
            <h2>Preparation for Quiz QQP</h2>
            <h3>{originalArray.join(' | ')}</h3>
            <div className="box-container">
                {randomArray.map((value, index) => (
                    <Box
                        key={index}
                        index={index}
                        value={value}
                        moveBox={moveBox}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        highlight={index === highlightedIndex}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuicksortPartition;

import React, { useState, useEffect } from 'react';
import Box from './Box';

const generateRandomArray = () => {
    const array = [];
    while (array.length < 15) {
        const randomInt = Math.floor(Math.random() * 41);
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
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const array = generateRandomArray();
        setRandomArray(array);
        setOriginalArray(array);
    }, []);

    const moveBox = (fromIndex, toIndex) => {
        const updatedArray = [...randomArray];
        [updatedArray[fromIndex], updatedArray[toIndex]] = [updatedArray[toIndex], updatedArray[fromIndex]];
        setRandomArray(updatedArray);
        setHighlightedIndex(null);
    };

    const handleDragOver = (index) => {
        setHighlightedIndex(index);
    };

    const handleDragLeave = () => {
        setHighlightedIndex(null);
    };

    const generateNewList = () => {
        const array = generateRandomArray();
        setRandomArray(array);
        setOriginalArray(array);
        setAnswer('');
    };

    const showAnswer = () => {
        if (originalArray.length === 0) return;

        const pivot = originalArray[0];
        const lessThanPivot = originalArray.filter(num => num < pivot);
        const greaterThanPivot = originalArray.filter(num => num > pivot);
        const result = `(${lessThanPivot.join(' ')}) ${pivot} (${greaterThanPivot.join(' ')})`;

        setAnswer(result);
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

            {answer && <h3>{answer}</h3>}

            <div className="button-container">
                <button className="styled-button" onClick={generateNewList}>Generate New List</button>
                <button className="styled-button" onClick={showAnswer}>Show Answer</button>
            </div>
        </div>
    );
};

export default QuicksortPartition;

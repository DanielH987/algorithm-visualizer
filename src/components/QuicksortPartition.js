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
    const [isCorrect, setIsCorrect] = useState(false);
    const [showAnswerButton, setShowAnswerButton] = useState(true);
    const [pivot, setPivot] = useState(null);  // Add state for pivot

    useEffect(() => {
        const array = generateRandomArray();
        setRandomArray(array);
        setOriginalArray(array);
        setPivot(array[array.length - 1]);  // Set the pivot
    }, []);

    const moveBox = (fromIndex, toIndex) => {
        const updatedArray = [...randomArray];
        [updatedArray[fromIndex], updatedArray[toIndex]] = [updatedArray[toIndex], updatedArray[fromIndex]];
        setRandomArray(updatedArray);
        setHighlightedIndex(null);
        verifyAnswer(updatedArray);
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
        setPivot(array[array.length - 1]);  // Reset the pivot
        setAnswer('');
        setIsCorrect(false);
        setShowAnswerButton(true);
    };

    const showAnswer = () => {
        const array = [...originalArray];
        const pivot = array[array.length - 1];
        let i = 0;
        let j = 0;
    
        while (i < array.length - 1) {
            if (array[i] < pivot) {
                [array[i], array[j]] = [array[j], array[i]];
                j++;
            }
            i++;
        }
        [array[j], array[array.length - 1]] = [array[array.length - 1], array[j]];
    
        const lessThanPivot = array.slice(0, j);
        const greaterThanOrEqualPivot = array.slice(j + 1);
    
        const partitionedArray = [
            `(${lessThanPivot.join(' ')})`,
            pivot,
            `(${greaterThanOrEqualPivot.join(' ')})`,
        ];
    
        setAnswer(partitionedArray.join(' '));
        setShowAnswerButton(false);
    };

    const verifyAnswer = (currentArray) => {
        const array = [...originalArray];
        const pivot = array[array.length - 1];
        let i = 0;
        let j = 0;

        while (i < array.length - 1) {
            if (array[i] < pivot) {
                [array[i], array[j]] = [array[j], array[i]];
                j++;
            }
            i++;
        }
        [array[j], array[array.length - 1]] = [array[array.length - 1], array[j]];

        const lessThanPivot = array.slice(0, j);
        const greaterThanOrEqualPivot = array.slice(j + 1);

        const correctArray = [...lessThanPivot, pivot, ...greaterThanOrEqualPivot];

        setIsCorrect(JSON.stringify(currentArray) === JSON.stringify(correctArray));
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
                        pivot={pivot}
                    />
                ))}
            </div>

            {isCorrect && <h3 className='correct'>Correct</h3>}
            {answer && <h3 className={isCorrect ? 'correct' : 'incorrect'}>{answer}</h3>}

            <div className="button-container">
                <button className="styled-button" onClick={generateNewList}>Generate New List</button>
                {showAnswerButton && <button className="styled-button" onClick={showAnswer}>Show Answer</button>}
            </div>
        </div>
    );
};

export default QuicksortPartition;

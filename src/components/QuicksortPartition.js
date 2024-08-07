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

    useEffect(() => {
        const array = generateRandomArray();
        setRandomArray(array);
    }, []);

    const moveBox = (fromIndex, toIndex) => {
        const updatedArray = [...randomArray];
        const [movedItem] = updatedArray.splice(fromIndex, 1);
        updatedArray.splice(toIndex, 0, movedItem);
        setRandomArray(updatedArray);
    };

    return (
        <div>
            <h2>Preparation for Quiz QQP</h2>
            <h3>{randomArray.join(' | ')}</h3>
            <div className="box-container">
                {randomArray.map((value, index) => (
                    <Box key={index} index={index} value={value} moveBox={moveBox} />
                ))}
            </div>
        </div>
    );
};

export default QuicksortPartition;

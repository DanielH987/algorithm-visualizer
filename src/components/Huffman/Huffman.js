import React, { useState } from 'react';
import './Huffman.css';

const Huffman = () => {
    const staticWords = ['Character', 'Frequency', 'Encoding', 'Bit Length'];

    const minRange = 1;
    const maxRange = 100;

    const [randomCharacters, setRandomCharacters] = useState(generateRandomCharacters());
    const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers());

    const [encodingInputs, setEncodingInputs] = useState(Array(7).fill(''));
    const [bitLengthInputs, setBitLengthInputs] = useState(Array(7).fill(''));

    function generateRandomCharacters() {
        return Array.from({ length: 7 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65));
    }

    function generateRandomNumbers() {
        return Array.from({ length: 7 }, () => Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
    }

    const handleEncodingChange = (index, value) => {
        if (/^[01]*$/.test(value)) {
            const newInputs = [...encodingInputs];
            newInputs[index] = value;
            setEncodingInputs(newInputs);
        }
    };

    const handleBitLengthChange = (index, value) => {
        if (/^\d*$/.test(value)) {
            const newInputs = [...bitLengthInputs];
            newInputs[index] = value;
            setBitLengthInputs(newInputs);
        }
    };

    const regenerate = () => {
        setRandomCharacters(generateRandomCharacters());
        setRandomNumbers(generateRandomNumbers());
        setEncodingInputs(Array(7).fill(''));
        setBitLengthInputs(Array(7).fill(''));
    };

    const calculateTotalBitLength = () => {
        return bitLengthInputs.reduce((total, num) => total + (parseInt(num, 10) || 0), 0);
    };

    return (
        <div className="huffman-container">
            <table className="huffman-table">
                <tbody>
                    {staticWords.map((word, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{word}</td>
                            {[...Array(7)].map((_, colIndex) => {
                                if (rowIndex === 0) {
                                    return <td key={colIndex}>{randomCharacters[colIndex]}</td>;
                                } else if (rowIndex === 1) {
                                    return <td key={colIndex}>{randomNumbers[colIndex]}</td>;
                                } else if (rowIndex === 2) {
                                    return (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={encodingInputs[colIndex]}
                                                onChange={(e) => handleEncodingChange(colIndex, e.target.value)}
                                            />
                                        </td>
                                    );
                                } else if (rowIndex === 3) {
                                    return (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={bitLengthInputs[colIndex]}
                                                onChange={(e) => handleBitLengthChange(colIndex, e.target.value)}
                                            />
                                        </td>
                                    );
                                } else {
                                    return <td key={colIndex}></td>;
                                }
                            })}
                        </tr>
                    ))}
                    <tr>
                        <td>Total Bit Length</td>
                        <td colSpan="7">{calculateTotalBitLength()}</td>
                    </tr>
                </tbody>
            </table>
            <button className='styled-button' onClick={regenerate}>Generate New</button>
        </div>
    );
}

export default Huffman;

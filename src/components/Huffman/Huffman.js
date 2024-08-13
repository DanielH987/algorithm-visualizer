import React, { useEffect, useState } from 'react';
import './Huffman.css';

const Huffman = ({
    randomCharacters,
    randomNumbers,
    encodingInputs,
    bitLengthInputs,
    totalBitLength,
    onEncodingChange,
    onBitLengthChange,
    onTotalBitLengthChange,
    showAnswer
}) => {
    const staticWords = ['Character', 'Frequency', 'Encoding', 'Bit Length', 'Total Bit Length'];
    const [computedTotalBitLength, setComputedTotalBitLength] = useState('');

    useEffect(() => {
        // Compute the Huffman encoding and total bit length when the component mounts or updates
        const totalLength = computeHuffmanTotalBitLength(randomCharacters, randomNumbers);
        setComputedTotalBitLength(totalLength);
    }, [randomCharacters, randomNumbers]);

    // Function to compute the total bit length using Huffman encoding
    const computeHuffmanTotalBitLength = (characters, frequencies) => {
        // Create a priority queue (min-heap) for the Huffman tree
        const heap = [];
        for (let i = 0; i < characters.length; i++) {
            heap.push({ char: characters[i], freq: frequencies[i], left: null, right: null });
        }
        heap.sort((a, b) => a.freq - b.freq);

        // Build the Huffman tree
        while (heap.length > 1) {
            const left = heap.shift();
            const right = heap.shift();
            const newNode = {
                char: null,
                freq: left.freq + right.freq,
                left: left,
                right: right
            };
            heap.push(newNode);
            heap.sort((a, b) => a.freq - b.freq);
        }

        // Function to calculate the bit length for each character
        const calculateBitLengths = (node, depth, bitLengths) => {
            if (node.char !== null) {
                bitLengths[node.char] = depth;
            }
            if (node.left) {
                calculateBitLengths(node.left, depth + 1, bitLengths);
            }
            if (node.right) {
                calculateBitLengths(node.right, depth + 1, bitLengths);
            }
        };

        const bitLengths = {};
        calculateBitLengths(heap[0], 0, bitLengths);

        // Calculate the total bit length
        let totalBitLength = 0;
        for (let i = 0; i < characters.length; i++) {
            totalBitLength += bitLengths[characters[i]] * frequencies[i];
        }
        return totalBitLength;
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
                                                onChange={(e) => onEncodingChange(colIndex, e.target.value)}
                                            />
                                        </td>
                                    );
                                } else if (rowIndex === 3) {
                                    return (
                                        <td key={colIndex}>
                                            <input
                                                type="text"
                                                value={bitLengthInputs[colIndex]}
                                                onChange={(e) => onBitLengthChange(colIndex, e.target.value)}
                                            />
                                        </td>
                                    );
                                } else {
                                    if (colIndex === 1) {
                                        return (
                                            <td key={colIndex} colSpan={7}>
                                                <input
                                                    type="text"
                                                    value={totalBitLength}
                                                    onChange={(e) => onTotalBitLengthChange(e.target.value)}
                                                />
                                            </td>
                                        );
                                    }
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {showAnswer && <h3>{computedTotalBitLength}</h3>}
        </div>
    );
}

export default Huffman;
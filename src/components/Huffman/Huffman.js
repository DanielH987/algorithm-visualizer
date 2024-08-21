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
        const totalLength = computeHuffmanTotalBitLength(randomCharacters, randomNumbers);
        setComputedTotalBitLength(totalLength);
    }, [randomCharacters, randomNumbers]);

    const computeHuffmanTotalBitLength = (characters, frequencies) => {
        const heap = [];
        for (let i = 0; i < characters.length; i++) {
            heap.push({ char: characters[i], freq: frequencies[i], left: null, right: null });
        }
        heap.sort((a, b) => a.freq - b.freq);

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

        let totalBitLength = 0;
        for (let i = 0; i < characters.length; i++) {
            totalBitLength += bitLengths[characters[i]] * frequencies[i];
        }
        return totalBitLength;
    };

    const isTotalBitLengthCorrect = computedTotalBitLength === parseInt(totalBitLength);

    return (
        <div>
            <h2>Preparation for Quiz QHUF</h2>
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
                {showAnswer && (
                    <h3 className={isTotalBitLengthCorrect ? 'green-text' : 'red-text'}>
                        {computedTotalBitLength}
                    </h3>
                )}
            </div>
        </div>
    );
}

export default Huffman;

import React from 'react';
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
            {/* // TODO: implement Huffman encoding logic */}
            {showAnswer && <h3>This is the answer</h3>}
        </div>
    );
}

export default Huffman;
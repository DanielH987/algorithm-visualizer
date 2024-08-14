import React, { useEffect, useState } from 'react';
import './HuffmanTree.css';

const HuffmanTree = ({
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

    const TreeNode = ({ node, depth }) => {
        if (!node) return null;
        return (
            <div className="tree-node">
                <div className="node-content">
                    {node.char !== null ? (
                        <>
                            <div>Character: {node.char}</div>
                            <div>Frequency: {node.freq}</div>
                            <div>
                                Encoding:
                                <input
                                    type="text"
                                    value={encodingInputs[randomCharacters.indexOf(node.char)]}
                                    onChange={(e) => onEncodingChange(randomCharacters.indexOf(node.char), e.target.value)}
                                />
                            </div>
                            <div>
                                Bit Length:
                                <input
                                    type="text"
                                    value={bitLengthInputs[randomCharacters.indexOf(node.char)]}
                                    onChange={(e) => onBitLengthChange(randomCharacters.indexOf(node.char), e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Frequency: {node.freq}</div>
                    )}
                </div>
                <div className="tree-children">
                    <TreeNode node={node.left} depth={depth + 1} />
                    <TreeNode node={node.right} depth={depth + 1} />
                </div>
            </div>
        );
    };

    return (
        <div className="huffman-tree-container">
            <div className="huffman-tree">
                <TreeNode node={computeHuffmanTotalBitLength(randomCharacters, randomNumbers, true)} depth={0} />
            </div>
            <div className="total-bit-length">
                <div>Total Bit Length:</div>
                <input
                    type="text"
                    value={totalBitLength}
                    onChange={(e) => onTotalBitLengthChange(e.target.value)}
                />
            </div>
            {showAnswer && (
                <h3 className={isTotalBitLengthCorrect ? 'green-text' : 'red-text'}>
                    {computedTotalBitLength}
                </h3>
            )}
        </div>
    );
}

export default HuffmanTree;

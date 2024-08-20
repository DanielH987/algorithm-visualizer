import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './HuffmanTree.css';

const Node = ({ number, rowIndex, colIndex, onNodeDrop, isDraggable }) => {
    const [isHovered, setIsHovered] = useState(false);

    const [, drag] = useDrag(() => ({
        type: 'node',
        item: { rowIndex, colIndex },
        canDrag: isDraggable,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: 'node',
        hover: () => {
            setIsHovered(true);
        },
        drop: (draggedItem, monitor) => {
            setIsHovered(false);
            if (draggedItem.colIndex !== colIndex) {
                const event = monitor.getClientOffset();
                onNodeDrop(draggedItem.colIndex, colIndex, event);
            }
        },
        collect: (monitor) => {
            if (!monitor.isOver()) {
                setIsHovered(false);
            }
        }
    }));

    if (number === null) {
        return <div className="node empty-node"></div>;
    }

    return (
        <div
            ref={isDraggable ? (node) => drag(drop(node)) : null}
            className={`node ${isHovered ? 'highlight' : ''}`}
        >
            {number}
        </div>
    );
};

const HuffmanTree = ({ randomNumbers }) => {
    const [numbers, setNumbers] = useState([randomNumbers]);
    const [colspans, setColspans] = useState([Array(randomNumbers.length).fill(1)]);
    const [dropdownPosition, setDropdownPosition] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pendingMove, setPendingMove] = useState(null);
    const [history, setHistory] = useState([]);
    const dropdownRef = useRef(null);

    const moveNode = (fromColIndex, toColIndex, shouldAddNodes = false) => {
        setNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            const updatedColspans = [...colspans];
    
            if (shouldAddNodes) {
                const sum = updatedNumbers[0][fromColIndex] + updatedNumbers[0][toColIndex];
    
                updatedNumbers[0][fromColIndex] = sum;
                updatedNumbers[0][toColIndex] = null;
    
                updatedColspans[0][fromColIndex] += updatedColspans[0][toColIndex];
                updatedColspans[0][toColIndex] = 0;
    
            } else {
                const temp = updatedNumbers[0][fromColIndex];
                updatedNumbers[0][fromColIndex] = updatedNumbers[0][toColIndex];
                updatedNumbers[0][toColIndex] = temp;
    
                const tempSpan = updatedColspans[0][fromColIndex];
                updatedColspans[0][fromColIndex] = updatedColspans[0][toColIndex];
                updatedColspans[0][toColIndex] = tempSpan;
            }
    
            setColspans(updatedColspans);
            return updatedNumbers;
        });
    };
    
    const handleNodeDrop = (fromColIndex, toColIndex, event) => {
        setPendingMove({ fromColIndex, toColIndex });

        const mouseX = event.x;
        const mouseY = event.y;

        setDropdownPosition({ top: mouseY, left: mouseX });
        setShowDropdown(true);
    };

    const areNodesAdjacent = (index1, index2) => {
        const minIndex = Math.min(index1, index2);
        const maxIndex = Math.max(index1, index2);

        for (let i = minIndex + 1; i < maxIndex; i++) {
            if (numbers[0][i] !== null) {
                return false;
            }
        }

        return true;
    };

    const handleOptionSelect = (option) => {
        if (pendingMove) {
            if (option === 'Swap Nodes') {
                moveNode(pendingMove.fromColIndex, pendingMove.toColIndex);
            } else if (option === 'Add Nodes') {
                if (areNodesAdjacent(pendingMove.fromColIndex, pendingMove.toColIndex)) {
                    moveNode(pendingMove.fromColIndex, pendingMove.toColIndex, true);
                } else {
                    console.log('Nodes are not adjacent. Add Nodes operation is not allowed.');
                }
            }
        }
        setPendingMove(null);
        setShowDropdown(false);
    };
    
    const revertLastAction = () => {
        if (history.length > 0) {
            const lastState = history.pop();
            setNumbers(lastState.numbers);
            setColspans(lastState.colspans);
            setHistory([...history]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div>
            <table className="huffman-tree">
                <tbody>
                    {numbers.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((number, colIndex) => {
                                if (number === null) return null;

                                return (
                                    <td key={colIndex} colSpan={colspans[rowIndex][colIndex]}>
                                        <Node
                                            rowIndex={rowIndex}
                                            colIndex={colIndex}
                                            number={number}
                                            onNodeDrop={handleNodeDrop}
                                            isDraggable={rowIndex === 0}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
                {showDropdown && (
                    <div ref={dropdownRef} className="dropdown-menu" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                        <ul>
                            <li onClick={() => handleOptionSelect('Swap Nodes')}>Swap Nodes</li>
                            <li 
                                onClick={() => areNodesAdjacent(pendingMove.fromColIndex, pendingMove.toColIndex) ? handleOptionSelect('Add Nodes') : null}
                                className={!areNodesAdjacent(pendingMove.fromColIndex, pendingMove.toColIndex) ? 'disabled' : ''}
                            >
                                Add Nodes
                            </li>
                        </ul>
                    </div>
                )}
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className='styled-button' onClick={revertLastAction} disabled={history.length === 0}>Undo</button>
            </div>
        </div>
    );
};

export default HuffmanTree;

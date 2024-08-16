import React, { useState, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './HuffmanTree.css';

const Node = ({ number, index, onNodeDrop }) => {
    const [isHovered, setIsHovered] = useState(false);

    const [, drag] = useDrag(() => ({
        type: 'node',
        item: { index },
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
            if (draggedItem.index !== index) {
                const event = monitor.getClientOffset();
                onNodeDrop(draggedItem.index, index, event);
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
            ref={(node) => drag(drop(node))}
            className={`node ${isHovered ? 'highlight' : ''}`}
        >
            {number}
        </div>
    );
};

const HuffmanTree = ({ randomNumbers }) => {
    const [colspans, setColspans] = useState(Array(randomNumbers.length).fill(1));
    const [numbers, setNumbers] = useState(randomNumbers);
    const [dropdownPosition, setDropdownPosition] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pendingMove, setPendingMove] = useState(null);
    const [history, setHistory] = useState([]); // State to keep track of history for revert feature
    const dropdownRef = useRef(null);

    const moveNode = (fromIndex, toIndex, shouldAddNodes = false) => {
        // Save the current state to the history before making changes
        setHistory(prevHistory => [...prevHistory, { numbers, colspans }]);
        
        setNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            const updatedColspans = [...colspans];
    
            if (shouldAddNodes) {
                const sum = updatedNumbers[fromIndex] + updatedNumbers[toIndex];
    
                updatedNumbers[fromIndex] = sum;
                updatedColspans[fromIndex] += updatedColspans[toIndex];
    
                updatedNumbers[toIndex] = null;
                updatedColspans[toIndex] = 0;
    
            } else {
                [updatedNumbers[fromIndex], updatedNumbers[toIndex]] = [updatedNumbers[toIndex], updatedNumbers[fromIndex]];
                [updatedColspans[fromIndex], updatedColspans[toIndex]] = [updatedColspans[toIndex], updatedColspans[fromIndex]];
            }
    
            setColspans(updatedColspans);
            return updatedNumbers;
        });
    };
    
    const handleNodeDrop = (fromIndex, toIndex, event) => {
        setPendingMove({ fromIndex, toIndex });
    
        const mouseX = event.x;
        const mouseY = event.y;
    
        setDropdownPosition({ top: mouseY, left: mouseX });
        setShowDropdown(true);
    };    

    const areNodesAdjacent = (index1, index2) => {
        const minIndex = Math.min(index1, index2);
        const maxIndex = Math.max(index1, index2);
        
        for (let i = minIndex + 1; i < maxIndex; i++) {
            if (numbers[i] !== null) {
                return false;
            }
        }
        
        return true;
    };
    
    const handleOptionSelect = (option) => {
        if (pendingMove) {
            if (option === 'Swap Nodes') {
                moveNode(pendingMove.fromIndex, pendingMove.toIndex);
            } else if (option === 'Add Nodes') {
                if (areNodesAdjacent(pendingMove.fromIndex, pendingMove.toIndex)) {
                    moveNode(pendingMove.fromIndex, pendingMove.toIndex, true);
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
            const lastState = history.pop(); // Get the last state from history
            setNumbers(lastState.numbers);
            setColspans(lastState.colspans);
            setHistory([...history]); // Update history without the last state
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className='styled-button' onClick={revertLastAction} disabled={history.length === 0}>Undo</button>
            </div>
            <table className="huffman-tree">
                <tbody>
                    <tr>
                        {numbers.map((number, index) => {
                            if (number === null) return null;

                            return (
                                <td key={index} colSpan={colspans[index]}>
                                    <Node
                                        index={index}
                                        number={number}
                                        onNodeDrop={handleNodeDrop}
                                    />
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
                {showDropdown && (
                    <div ref={dropdownRef} className="dropdown-menu" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                        <ul>
                            <li onClick={() => handleOptionSelect('Swap Nodes')}>Swap Nodes</li>
                            <li 
                                onClick={() => areNodesAdjacent(pendingMove.fromIndex, pendingMove.toIndex) ? handleOptionSelect('Add Nodes') : null}
                                className={!areNodesAdjacent(pendingMove.fromIndex, pendingMove.toIndex) ? 'disabled' : ''}
                            >
                                Add Nodes
                            </li>
                        </ul>
                    </div>
                )}
            </table>
        </div>
    );
}

export default HuffmanTree;

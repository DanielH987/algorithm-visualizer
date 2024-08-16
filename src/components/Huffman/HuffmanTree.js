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
        drop: (draggedItem) => {
            setIsHovered(false);
            if (draggedItem.index !== index) {
                onNodeDrop(draggedItem.index, index);
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
    const dropdownRef = useRef(null);

    const moveNode = (fromIndex, toIndex, shouldAddNodes = false) => {
        setNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            const updatedColspans = [...colspans];
    
            if (shouldAddNodes) {
                // Create a new node that is the sum of the two nodes
                const sum = updatedNumbers[fromIndex] + updatedNumbers[toIndex];
    
                // Replace the first node with the sum and merge their column spans
                updatedNumbers[fromIndex] = sum;
                updatedColspans[fromIndex] += updatedColspans[toIndex];
    
                // Mark the second node as null
                updatedNumbers[toIndex] = null;
                updatedColspans[toIndex] = 0; // No columns for null node
    
            } else {
                // Handle swapping logic if necessary
                [updatedNumbers[fromIndex], updatedNumbers[toIndex]] = [updatedNumbers[toIndex], updatedNumbers[fromIndex]];
            }
    
            setColspans(updatedColspans);
            return updatedNumbers;
        });
    };    

    const handleNodeDrop = (fromIndex, toIndex) => {
        setPendingMove({ fromIndex, toIndex });

        const nodeElement = document.querySelectorAll('.node')[toIndex];
        const rect = nodeElement.getBoundingClientRect();
        setDropdownPosition({ top: rect.bottom, left: rect.left });
        setShowDropdown(true);
    };

    const areNodesAdjacent = (index1, index2) => {
        const minIndex = Math.min(index1, index2);
        const maxIndex = Math.max(index1, index2);
        
        // Traverse between the two indexes and check if there's any non-null node between them
        for (let i = minIndex + 1; i < maxIndex; i++) {
            if (numbers[i] !== null) {
                return false; // Not adjacent if there's a non-null node in between
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
        <table className="huffman-tree">
            <tbody>
                <tr>
                    {numbers.map((number, index) => {
                        if (number === null) return null; // Skip null nodes

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
    );
}

export default HuffmanTree;

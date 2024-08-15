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
    const [numbers, setNumbers] = useState(randomNumbers);
    const [dropdownPosition, setDropdownPosition] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pendingMove, setPendingMove] = useState(null);
    const dropdownRef = useRef(null);

    const moveNode = (fromIndex, toIndex) => {
        setNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            [updatedNumbers[fromIndex], updatedNumbers[toIndex]] = [updatedNumbers[toIndex], updatedNumbers[fromIndex]];
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
        return Math.abs(index1 - index2) === 1;
    };

    const handleOptionSelect = (option) => {
        if (option === 'Move Node' && pendingMove) {
            moveNode(pendingMove.fromIndex, pendingMove.toIndex);
        } else if (option === 'Add Nodes' && pendingMove) {
            if (areNodesAdjacent(pendingMove.fromIndex, pendingMove.toIndex)) {
                // Implement Add Nodes logic here
                console.log('Nodes are adjacent. Implement Add Nodes logic.');
            } else {
                console.log('Nodes are not adjacent. Add Nodes operation is not allowed.');
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
                    {numbers.map((number, index) => (
                        <td key={index}>
                            <Node
                                index={index}
                                number={number}
                                onNodeDrop={handleNodeDrop}
                            />
                        </td>
                    ))}
                </tr>
            </tbody>
            {showDropdown && (
                <div ref={dropdownRef} className="dropdown-menu" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                    <ul>
                        <li onClick={() => handleOptionSelect('Move Node')}>Swap Nodes</li>
                        <li 
                            onClick={() => areNodesAdjacent(pendingMove.fromIndex, pendingMove.toIndex) ? handleOptionSelect('Add Nodes') : null}
                            className={!areNodesAdjacent(pendingMove.fromIndex, pendingMove.toIndex) ? 'disabled' : ''}
                        >
                            Sum Nodes
                        </li>
                    </ul>
                </div>
            )}
        </table>
    );
}

export default HuffmanTree;

import React, { useState } from 'react';
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

    const handleOptionSelect = (option) => {
        if (option === 'Move Node' && pendingMove) {
            moveNode(pendingMove.fromIndex, pendingMove.toIndex);
        } else {
            // Option selected is not 'Move Node', no move occurs (reverts to original position)
            setPendingMove(null);
        }
        setShowDropdown(false);
    };

    return (
        <div className="huffman-tree">
            {numbers.map((number, index) => (
                <Node
                    key={index}
                    index={index}
                    number={number}
                    onNodeDrop={handleNodeDrop}
                />
            ))}
            {showDropdown && (
                <div className="dropdown-menu" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                    <ul>
                        <li onClick={() => handleOptionSelect('Move Node')}>Move Node</li>
                        <li onClick={() => handleOptionSelect('Add Nodes')}>Add Nodes</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HuffmanTree;

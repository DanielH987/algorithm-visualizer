import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './HuffmanTree.css';

const Node = ({ number, index, moveNode, onNodeDrop }) => {
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
                moveNode(draggedItem.index, index);
                onNodeDrop(index); // Trigger the dropdown menu
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

    const moveNode = (fromIndex, toIndex) => {
        setNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            [updatedNumbers[fromIndex], updatedNumbers[toIndex]] = [updatedNumbers[toIndex], updatedNumbers[fromIndex]];
            return updatedNumbers;
        });
    };

    const handleNodeDrop = (index) => {
        const nodeElement = document.querySelectorAll('.node')[index];
        const rect = nodeElement.getBoundingClientRect();
        setDropdownPosition({ top: rect.bottom, left: rect.left });
        setShowDropdown(true);
    };

    const handleOptionSelect = (option) => {
        console.log(`Option selected: ${option}`);
        setShowDropdown(false);
    };

    return (
        <div className="huffman-tree">
            {numbers.map((number, index) => (
                <Node
                    key={index}
                    index={index}
                    number={number}
                    moveNode={moveNode}
                    onNodeDrop={handleNodeDrop}
                />
            ))}
            {showDropdown && (
                <div className="dropdown-menu" style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                    <ul>
                        <li onClick={() => handleOptionSelect('Option 1')}>Move Node</li>
                        <li onClick={() => handleOptionSelect('Option 2')}>Add Nodes</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HuffmanTree;

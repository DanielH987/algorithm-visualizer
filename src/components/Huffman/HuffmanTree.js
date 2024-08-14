import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './HuffmanTree.css';

const Node = ({ number, index, moveNode }) => {
    const [isHovered, setIsHovered] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
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

    const moveNode = (fromIndex, toIndex) => {
        setNumbers((prevNumbers) => {
            const updatedNumbers = [...prevNumbers];
            [updatedNumbers[fromIndex], updatedNumbers[toIndex]] = [updatedNumbers[toIndex], updatedNumbers[fromIndex]];
            return updatedNumbers;
        });
    };
    
    return (
        <div className="huffman-tree">
            {numbers.map((number, index) => (
                <Node
                    key={index}
                    index={index}
                    number={number}
                    moveNode={moveNode}
                />
            ))}
        </div>
    );
}

export default HuffmanTree;

// Box.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Box.css';

const Box = ({ value, index, moveBox, onDragOver, onDragLeave, highlight, pivot, boxStyleOverride }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'BOX',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: 'BOX',
        drop: (item) => {
            if (item.index !== index) {
                moveBox(item.index, index);
                item.index = index;
                onDragLeave();
            }
        },
        hover: () => {
            onDragOver(index);
        },
        leave: () => {
            onDragLeave();
        },
    });

    const defaultBoxStyle = value !== pivot ? (value < pivot ? 'box-yellow' : 'box-blue') : '';
    const boxStyle = boxStyleOverride || defaultBoxStyle;

    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            className={`box ${highlight ? 'highlight' : ''} ${isDragging ? 'is-dragging' : ''} ${boxStyle}`}
        >
            {value}
        </div>
    );
};

export default Box;

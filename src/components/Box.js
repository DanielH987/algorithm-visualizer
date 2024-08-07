import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Box = ({ value, index, moveBox, onDragOver, onDragLeave, highlight }) => {
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
                onDragLeave(); // Reset highlight after drop
            }
        },
        hover: () => {
            onDragOver(index);
        },
        leave: () => {
            onDragLeave();
        },
    });

    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            className={`box ${highlight ? 'highlight' : ''} ${isDragging ? 'is-dragging' : ''}`}
        >
            {value}
        </div>
    );
};

export default Box;

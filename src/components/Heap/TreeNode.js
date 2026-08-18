import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './TreeNode.css';

const ItemType = 'NODE';

const TreeNode = ({ node, index, leftChild, rightChild, moveNode }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      moveNode(item.index, index);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="tree-node-container">
      <div ref={drop}>
        <div
          ref={drag}
          style={{ opacity: isDragging ? 0.5 : 1 }}
          className={`tree-node ${isOver ? 'highlight' : ''}`}
        >
          {node.value}
        </div>
      </div>
      <div className="tree-children">
        {/* SVG branch lines – straight diagonals from parent to children */}
        <svg className="branch" width="100%" height="30" xmlns="http://www.w3.org/2000/svg">
            {leftChild && (
              <line
                x1="50%"
                y1="0"
                x2={rightChild ? "25%" : "50%"}
                y2="30"
                stroke="#111"
                strokeWidth={2}
              />
            )}
            {rightChild && (
              <line
                x1="50%"
                y1="0"
                x2={leftChild ? "75%" : "50%"}
                y2="30"
                stroke="#111"
                strokeWidth={2}
              />
            )}
          </svg>
        {leftChild && (
          <TreeNode
            node={leftChild.node}
            index={leftChild.index}
            leftChild={leftChild.leftChild}
            rightChild={leftChild.rightChild}
            moveNode={moveNode}
          />
        )}
        {rightChild && (
          <TreeNode
            node={rightChild.node}
            index={rightChild.index}
            leftChild={rightChild.leftChild}
            rightChild={rightChild.rightChild}
            moveNode={moveNode}
          />
        )}
      </div>
    </div>
  );
};

export default TreeNode;

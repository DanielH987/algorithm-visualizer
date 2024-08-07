import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

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

import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './BinarySearchTree.css'; // Assume basic styles here

const Node = ({ value }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NODE',
    item: { value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`node ${isDragging ? 'dragging' : ''}`}>
      {value}
    </div>
  );
};

const BSTSlot = ({ acceptNode, children, highlight }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'NODE',
    drop: (item) => acceptNode(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bst-slot ${highlight && isOver ? 'highlight' : ''}`}
    >
      {children}
    </div>
  );
};

const BSTNode = ({ value }) => {
  const [leftNode, setLeftNode] = useState(null);
  const [rightNode, setRightNode] = useState(null);

  const handleDropLeft = (item) => {
    if (!leftNode) {
      setLeftNode(item.value); // Only store the value of the dropped node
    }
  };

  const handleDropRight = (item) => {
    if (!rightNode) {
      setRightNode(item.value); // Only store the value of the dropped node
    }
  };

  return (
    <div className="bst-node">
      <Node value={value} />
      <div className="bst-children">
        <BSTSlot acceptNode={handleDropLeft} highlight={true}>
          {leftNode ? <BSTNode value={leftNode} /> : 'Left Child'}
        </BSTSlot>
        <BSTSlot acceptNode={handleDropRight} highlight={true}>
          {rightNode ? <BSTNode value={rightNode} /> : 'Right Child'}
        </BSTSlot>
      </div>
    </div>
  );
};

const BST = ({ randomNumbers }) => {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    setRoot(null); // Reset tree when randomNumbers change
  }, [randomNumbers]);

  const handleDropRoot = (item) => {
    setRoot(item);
  };

  return (
    <div className="bst-container">
      {root ? (
        <BSTNode {...root} />
      ) : (
        <BSTSlot acceptNode={handleDropRoot} highlight={true}>
          Place Root Node
        </BSTSlot>
      )}
    </div>
  );
};

const NodePool = ({ nodes }) => {
  return (
    <div className="node-pool">
      {nodes.map((value, index) => (
        <Node key={index} value={value} />
      ))}
    </div>
  );
};

const BinarySearchTree = ({ randomNumbers }) => {
  return (
    <div>
      <NodePool nodes={randomNumbers} />
      <BST randomNumbers={randomNumbers} />
    </div>
  );
};

export default BinarySearchTree;

import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './BinarySearchTree.css'; // Assume basic styles here

// Node component representing a draggable node
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

// Drop slot for placing nodes in the tree
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

// Recursively renders the Binary Search Tree nodes
const BSTNode = ({ value }) => {
  const [leftNode, setLeftNode] = useState(null);
  const [rightNode, setRightNode] = useState(null);

  const handleDropLeft = (item) => {
      setLeftNode(item);
  };

  const handleDropRight = (item) => {
      setRightNode(item);
  };

  return (
    <div className="bst-node">
      <Node value={value} />
      <div className="bst-children">
        <BSTSlot acceptNode={handleDropLeft} highlight={true}>
          {leftNode ? <BSTNode {...leftNode} /> : 'Left Child'}
        </BSTSlot>
        <BSTSlot acceptNode={handleDropRight} highlight={true}>
          {rightNode ? <BSTNode {...rightNode} /> : 'Right Child'}
        </BSTSlot>
      </div>
    </div>
  );
};

// The root Binary Search Tree component
const BST = () => {
  const [root, setRoot] = useState(null);

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

// Pool of nodes at the top of the screen
const NodePool = ({ nodes }) => {
  return (
    <div className="node-pool">
      {nodes.map((value, index) => (
        <Node key={index} value={value} />
      ))}
    </div>
  );
};

// Main application component
const BinarySearchTree = () => {
  const nodeArray = [50, 30, 70, 20, 40, 60, 80]; // Example node values

  return (
      <div className="app">
        <h2>Preparation for Quiz QHUF</h2>
        <NodePool nodes={nodeArray} />
        <BST />
      </div>
  );
};

export default BinarySearchTree;

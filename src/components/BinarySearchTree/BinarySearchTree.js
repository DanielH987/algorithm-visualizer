import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './BinarySearchTree.css';

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

const BSTNode = ({ value, setTree, parentTree }) => {
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  const handleDropLeft = (item) => {
    if (!left) {
      setLeft(item.value);
      updateTree(parentTree, value, item.value, 'left');
      setTree({ ...parentTree });
    }
  };

  const handleDropRight = (item) => {
    if (!right) {
      setRight(item.value);
      updateTree(parentTree, value, item.value, 'right');
      setTree({ ...parentTree });
    }
  };

  return (
    <div className="bst-node">
      <Node value={value} />
      <div className="bst-children">
        <BSTSlot acceptNode={handleDropLeft} highlight={true}>
          {left ? <BSTNode value={left} setTree={setTree} parentTree={parentTree} /> : 'Left Child'}
        </BSTSlot>
        <BSTSlot acceptNode={handleDropRight} highlight={true}>
          {right ? <BSTNode value={right} setTree={setTree} parentTree={parentTree} /> : 'Right Child'}
        </BSTSlot>
      </div>
    </div>
  );
};

const updateTree = (tree, parentValue, childValue, direction) => {
  if (!tree) return { value: parentValue, left: null, right: null };
  if (tree.value === parentValue) {
    if (direction === 'left') tree.left = { value: childValue, left: null, right: null };
    if (direction === 'right') tree.right = { value: childValue, left: null, right: null };
  } else {
    if (tree.left) updateTree(tree.left, parentValue, childValue, direction);
    if (tree.right) updateTree(tree.right, parentValue, childValue, direction);
  }
};

const BST = ({ randomNumbers, setUserTree }) => {
  const [root, setRoot] = useState(null);
  const [treeStructure, setTreeStructure] = useState(null);

  useEffect(() => {
    setRoot(null);
    setUserTree(null);
  }, [randomNumbers]);

  const handleDropRoot = (item) => {
    const newTree = { value: item.value, left: null, right: null };
    setRoot(item.value);
    setTreeStructure(newTree);
    setUserTree(newTree);
  };

  return (
    <div className="bst-container">
      {root ? (
        <BSTNode value={root} setTree={setUserTree} parentTree={treeStructure} />
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

const BinarySearchTree = ({ randomNumbers, setUserTree }) => {
  return (
    <div>
      <NodePool nodes={randomNumbers} />
      <BST randomNumbers={randomNumbers} setUserTree={setUserTree} />
    </div>
  );
};

export default BinarySearchTree;

import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './BinarySearchTree.css';

const Node = ({ value, isPlaced }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NODE',
    item: { value },
    canDrag: !isPlaced,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={!isPlaced ? drag : null}
      className={`node ${isDragging ? 'dragging' : ''} ${isPlaced ? 'placed' : ''}`}
    >
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

const BSTNode = ({ value, setTree, parentTree, placedNodes, setPlacedNodes }) => {
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  const handleDropLeft = (item) => {
    if (!left) {
      setLeft(item.value);
      updateTree(parentTree, value, item.value, 'left');
      setTree({ ...parentTree });
      setPlacedNodes([...placedNodes, item.value]);
    }
  };

  const handleDropRight = (item) => {
    if (!right) {
      setRight(item.value);
      updateTree(parentTree, value, item.value, 'right');
      setTree({ ...parentTree });
      setPlacedNodes([...placedNodes, item.value]);
    }
  };

  return (
    <div className="bst-node">
      <Node value={value} isPlaced={true} />
      <div className="bst-children">
        <BSTSlot acceptNode={handleDropLeft} highlight={true}>
          {left ? (
            <BSTNode
              value={left}
              setTree={setTree}
              parentTree={parentTree}
              placedNodes={placedNodes}
              setPlacedNodes={setPlacedNodes}
            />
          ) : (
            'Left Child'
          )}
        </BSTSlot>
        <BSTSlot acceptNode={handleDropRight} highlight={true}>
          {right ? (
            <BSTNode
              value={right}
              setTree={setTree}
              parentTree={parentTree}
              placedNodes={placedNodes}
              setPlacedNodes={setPlacedNodes}
            />
          ) : (
            'Right Child'
          )}
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
  const [placedNodes, setPlacedNodes] = useState([]);

  useEffect(() => {
    setRoot(null);
    setUserTree(null);
    setPlacedNodes([]);
  }, [randomNumbers]);

  const handleDropRoot = (item) => {
    const newTree = { value: item.value, left: null, right: null };
    setRoot(item.value);
    setTreeStructure(newTree);
    setUserTree(newTree);
    setPlacedNodes([...placedNodes, item.value]);
  };

  return (
    <div className="bst-container">
      {root ? (
        <BSTNode
          value={root}
          setTree={setUserTree}
          parentTree={treeStructure}
          placedNodes={placedNodes}
          setPlacedNodes={setPlacedNodes}
        />
      ) : (
        <BSTSlot acceptNode={handleDropRoot} highlight={true}>
          Place Root Node
        </BSTSlot>
      )}
    </div>
  );
};

const NodePool = ({ nodes, placedNodes }) => {
  return (
    <div className="node-pool">
      {nodes.map((value, index) => (
        <Node key={index} value={value} isPlaced={placedNodes.includes(value)} />
      ))}
    </div>
  );
};

const BinarySearchTree = ({ randomNumbers, setUserTree }) => {
  const [placedNodes, setPlacedNodes] = useState([]);

  return (
    <div>
      <NodePool nodes={randomNumbers} placedNodes={placedNodes} />
      <BST randomNumbers={randomNumbers} setUserTree={setUserTree} />
    </div>
  );
};

export default BinarySearchTree;

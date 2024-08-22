import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './BinarySearchTree.css';

const Node = ({ id, value, isPlaced }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NODE',
    item: { id, value },
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

const BSTNode = ({ id, value, setTree, parentTree, placedNodes, setPlacedNodes }) => {
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  const handleDropLeft = (item) => {
    if (!left) {
      setLeft(item);
      updateTree(parentTree, value, item.value, 'left');
      setTree({ ...parentTree });
      setPlacedNodes([...placedNodes, item.id]);
    }
  };

  const handleDropRight = (item) => {
    if (!right) {
      setRight(item);
      updateTree(parentTree, value, item.value, 'right');
      setTree({ ...parentTree });
      setPlacedNodes([...placedNodes, item.id]);
    }
  };

  return (
    <div className="bst-node">
      <Node id={id} value={value} isPlaced={true} />
      <div className="bst-children">
        <BSTSlot acceptNode={handleDropLeft} highlight={true}>
          {left ? (
            <BSTNode
              id={left.id}
              value={left.value}
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
              id={right.id}
              value={right.value}
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

const BST = ({ randomNumbers, setUserTree, placedNodes, setPlacedNodes }) => {
  const [root, setRoot] = useState(null);
  const [treeStructure, setTreeStructure] = useState(null);

  useEffect(() => {
    setRoot(null);
    setTreeStructure(null);
  }, [randomNumbers]);

  const handleDropRoot = (item) => {
    const newTree = { value: item.value, left: null, right: null };
    setRoot(item.value);
    setTreeStructure(newTree);
    setUserTree(newTree);
    setPlacedNodes([...placedNodes, item.id]);
  };

  return (
    <div className="bst-container">
      {root ? (
        <BSTNode
          id={root}
          value={root}
          setTree={setUserTree}
          parentTree={treeStructure}
          placedNodes={placedNodes}
          setPlacedNodes={setPlacedNodes}
        />
      ) : (
        <BSTSlot acceptNode={handleDropRoot} highlight={true}>
          Place Root Node here
        </BSTSlot>
      )}
    </div>
  );
};

const NodePool = ({ nodes, placedNodes }) => {
  const availableNodes = nodes.filter((node) => !placedNodes.includes(node.id));

  return (
    <div className="node-pool">
      {availableNodes.map((node) => (
        <Node key={node.id} id={node.id} value={node.value} isPlaced={false} />
      ))}
    </div>
  );
};

const BinarySearchTree = ({ randomNumbers, setUserTree }) => {
  const [placedNodes, setPlacedNodes] = useState([]);

  const nodesWithIds = randomNumbers.map((value, index) => ({ id: index, value }));

  useEffect(() => {
    setPlacedNodes([]);
  }, [randomNumbers]);

  return (
    <div>
      <NodePool nodes={nodesWithIds} placedNodes={placedNodes} />
      <BST
        randomNumbers={randomNumbers}
        setUserTree={setUserTree}
        placedNodes={placedNodes}
        setPlacedNodes={setPlacedNodes}
      />
    </div>
  );
};

export default BinarySearchTree;

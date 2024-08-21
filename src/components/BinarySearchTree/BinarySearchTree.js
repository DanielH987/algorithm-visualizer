import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const NODE_TYPE = 'node';

const Node = ({ value }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: NODE_TYPE,
    item: { value },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        border: '1px solid black',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        backgroundColor: isDragging ? 'lightgreen' : 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'move',
      }}
    >
      {value}
    </div>
  );
};

const TreeNode = ({ node, onDropNode }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: NODE_TYPE,
    drop: (item) => onDropNode(node, item.value),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        padding: '10px',
        border: '1px solid black',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        backgroundColor: isOver ? 'lightblue' : 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
      }}
    >
      {node.value ?? 'Drop here'}
    </div>
  );
};

const BinarySearchTree = () => {
  const [tree, setTree] = useState({});
  const nodes = [5, 3, 8, 1, 4, 7, 10];

  const handleDropNode = (parentNode, value) => {
    const newTree = { ...tree };
    if (!parentNode.value) {
      // Root node
      newTree.value = value;
    } else if (value < parentNode.value) {
      if (!parentNode.left) {
        parentNode.left = { value };
      } else {
        alert('This position is already occupied!');
      }
    } else if (value > parentNode.value) {
      if (!parentNode.right) {
        parentNode.right = { value };
      } else {
        alert('This position is already occupied!');
      }
    }
    setTree(newTree);
  };

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TreeNode node={node} onDropNode={handleDropNode} />
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '150px' }}>
          {renderTree(node.left)}
          {renderTree(node.right)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Binary Search Tree</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {nodes.map((value) => (
          <Node key={value} value={value} />
        ))}
      </div>
      <div>{renderTree(tree)}</div>
    </div>
  );
};

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BinarySearchTree />
    </DndProvider>
  );
};

export default App;

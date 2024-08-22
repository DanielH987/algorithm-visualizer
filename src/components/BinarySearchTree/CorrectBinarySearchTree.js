import React from 'react';
import './BinarySearchTree.css';

const insertIntoBST = (root, value) => {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = insertIntoBST(root.left, value);
  else root.right = insertIntoBST(root.right, value);
  return root;
};

export const buildCorrectTree = (randomNumbers) => {
  let root = null;
  randomNumbers.forEach(num => {
    root = insertIntoBST(root, num);
  });
  return root;
};

const renderTree = (node) => {
  if (!node) return null;
  return (
    <div className="bst-node">
      <div className='node placed'>{node.value}</div>
      <div className="bst-children">
        <div className='bst-slot'>{node.left ? renderTree(node.left) : 'Left Child'}</div>
        <div className='bst-slot'>{node.right ? renderTree(node.right) : 'Right Child'}</div>
      </div>
    </div>
  );
};

const CorrectBinarySearchTree = ({ randomNumbers }) => {
  const root = buildCorrectTree(randomNumbers);
  return <div className="bst-container">{renderTree(root)}</div>;
};

export default CorrectBinarySearchTree;

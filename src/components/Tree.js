import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import TreeNode from './TreeNode';

const generateRandomArray = () => {
  const minLength = 10;
  const maxLength = 15;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const maxValue = 30;
  const array = Array.from({ length: maxValue }, (_, i) => i + 1);
  array.sort(() => Math.random() - 0.5);
  return array.slice(0, length);
};

const buildMaxHeap = (array) => {
  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }
  return array;
};

const heapify = (array, n, i) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, n, largest);
  }
};

const createNode = (nodes, index) => {
  if (index >= nodes.length) return null;
  return {
    node: nodes[index],
    index: index,
    leftChild: createNode(nodes, index * 2 + 1),
    rightChild: createNode(nodes, index * 2 + 2),
  };
};

const createTreeData = (nodes) => {
  if (!nodes || nodes.length === 0) return null;
  return createNode(nodes, 0);
};

const Tree = () => {
  const [originalNodes, setOriginalNodes] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctOrder, setCorrectOrder] = useState([]);

  useEffect(() => {
    const initialNodes = generateRandomArray().map((value, index) => ({ id: index, value }));
    setOriginalNodes(initialNodes);
    setNodes(initialNodes);
  }, []);

  const moveNode = useCallback(
    (fromIndex, toIndex) => {
      const updatedNodes = update(nodes, {
        [fromIndex]: { $set: nodes[toIndex] },
        [toIndex]: { $set: nodes[fromIndex] },
      });
      setNodes(updatedNodes);
    },
    [nodes],
  );

  const handleShowAnswer = () => {
    const heapArray = buildMaxHeap(nodes.map(node => node.value));
    setCorrectOrder(heapArray);
    setShowAnswer(true);
  };

  const verifyAnswer = () => {
    const currentValues = nodes.map(node => node.value);
    const isCorrectOrder = JSON.stringify(currentValues) === JSON.stringify(correctOrder);
    setIsCorrect(isCorrectOrder);
  };

  const treeData = createTreeData(nodes);

  const displayNodes = (nodes) => {
    return nodes.map((node, index) => (
      <span key={index}>
        {node.value}
        {index < nodes.length - 1 && ' | '}
      </span>
    ));
  };

  const displayCorrectOrder = (order) => {
    return order.map((value, index) => (
      <span key={index}>
        {value}
        {index < order.length - 1 && ' | '}
      </span>
    ));
  };

  return (
    <div>
      <h2>Preparation for Quiz QHP</h2>
      <h3>{displayNodes(originalNodes)}</h3>
      <div className="tree">
        {treeData && (
          <TreeNode
            node={treeData.node}
            index={0}
            leftChild={treeData.leftChild}
            rightChild={treeData.rightChild}
            moveNode={moveNode}
          />
        )}
      </div>
      <h3><strong>{isCorrect ? 'Correct!' : 'Incorrect, please try again.'}</strong></h3>
      {showAnswer && <h3>Correct Order: {displayCorrectOrder(correctOrder)}</h3>}
      <div className="button-container">
        {!showAnswer && <button className="styled-button" onClick={handleShowAnswer}>Show Answer</button>}
        <button className="styled-button" onClick={verifyAnswer}>Verify Answer</button>
      </div>
    </div>
  );
};

export default Tree;

import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import TreeNode from './TreeNode';

const initialArray = [7, 12, 15, 6, 13, 3, 14, 10, 11, 5, 2, 1, 8, 9, 4];

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
  const [nodes, setNodes] = useState(initialArray.map((value, index) => ({ id: index, value })));
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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
    setShowAnswer(true);
    const heapArray = buildMaxHeap(nodes.map(node => node.value));
    const isCorrectHeap = nodes.every((node, index) => node.value === heapArray[index]);
    setIsCorrect(isCorrectHeap);
  };

  const treeData = createTreeData(nodes);

  return (
    <div>
      <h2>Preparation for Quiz QHP</h2>
      <p>Perform the BUILD-MAX-HEAP algorithm on the following array of numbers. Then click the "Show Answer" button to check your work.</p>
      <p>Reload the page at any time to generate a new practice quiz.</p>
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
      {showAnswer && <p><strong>{isCorrect ? 'Correct!' : 'Incorrect, please try again.'}</strong></p>}
      <button onClick={handleShowAnswer}>Show Answer</button>
    </div>
  );
};

export default Tree;

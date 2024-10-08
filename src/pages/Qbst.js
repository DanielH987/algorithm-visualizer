import React, { useState, useEffect } from 'react';
import CorrectBinarySearchTree, { buildCorrectTree } from '../components/BinarySearchTree/CorrectBinarySearchTree'; 
import BinarySearchTree from '../components/BinarySearchTree/BinarySearchTree';
import Modal from '../components/Modal/Modal';

const Qbst = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [showCorrectTree, setShowCorrectTree] = useState(false);
  const [userTree, setUserTree] = useState(null);
  const [isTreeCorrect, setIsTreeCorrect] = useState(false);

  const generateRandomNumbers = () => {
    const size = 7;
    const min = 1;
    const max = 50;
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  };

  useEffect(() => {
    setRandomNumbers(generateRandomNumbers());
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerateNew = () => {
    setRandomNumbers(generateRandomNumbers());
    setShowCorrectTree(false);
  };

  const handleShowAnswer = () => {
    setShowCorrectTree(!showCorrectTree);
  };

  const compareTrees = (userTree, correctTree) => {
    if (!userTree && !correctTree) return true;
    if (!userTree || !correctTree) return false;
    if (userTree.value !== correctTree.value) return false;
    return compareTrees(userTree.left, correctTree.left) && compareTrees(userTree.right, correctTree.right);
  };
        <p>Arrange the following numbers by dragging and dropping them into an empty binary search tree. Build the tree correctly to complete the task.</p>

  useEffect(() => {
    if (userTree) {
      console.log("User tree updated:", userTree);
      const correctTree = buildCorrectTree(randomNumbers);
      const isCorrect = compareTrees(userTree, correctTree);
      console.log("Is tree correct?", isCorrect);
      setIsTreeCorrect(isCorrect);
    }
  }, [userTree, randomNumbers]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Preparation for Quiz QBST</h2>

      <div style={{ display: showCorrectTree ? 'none' : 'block' }}>
        <BinarySearchTree randomNumbers={randomNumbers} setUserTree={setUserTree} />
      </div>
      
      <div style={{ display: showCorrectTree ? 'block' : 'none' }}>
        <CorrectBinarySearchTree randomNumbers={randomNumbers} />
      </div>

      {isTreeCorrect && <h3 className="correct">Correct!</h3>}

      <button className='styled-button' onClick={handleGenerateNew} style={{ marginTop: '20px' }}>Generate New</button>
      <button className='styled-button' onClick={handleShowAnswer} style={{ marginTop: '20px' }}>{!showCorrectTree ? 'Show Answer' : 'Hide Answer'}</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the Qbst Page!</h2>
        <p>Arrange the following numbers by <strong>dragging</strong> and <strong>dropping</strong> them into an empty binary search tree. Build the tree correctly to complete the task.</p>
        <p>You'll see a <strong>"Correct!"</strong> message once you've successfully completed the algorithm.</p>
        <p>Click <strong>"Generate New"</strong> to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qbst;

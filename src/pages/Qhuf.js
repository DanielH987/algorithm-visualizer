import React, { useState, useEffect } from 'react';
import Huffman from '../components/Huffman/Huffman';
import HuffmanTree from '../components/Huffman/HuffmanTree';
import Modal from '../components/Modal/Modal';
import Test from '../components/Huffman/Test';

const Qhuf = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const minRange = 1;
  const maxRange = 100;

  function generateRandomCharacters() {
    return Array.from({ length: 7 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65));
  }

  function generateRandomNumbers() {
    return Array.from({ length: 7 }, () => Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
  }

  const [randomCharacters, setRandomCharacters] = useState(generateRandomCharacters());
  const [randomNumbers, setRandomNumbers] = useState(generateRandomNumbers());
  const [encodingInputs, setEncodingInputs] = useState(Array(7).fill(''));
  const [bitLengthInputs, setBitLengthInputs] = useState(Array(7).fill(''));
  const [totalBitLength, setTotalBitLength] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const regenerate = () => {
    setRandomCharacters(generateRandomCharacters());
    setRandomNumbers(generateRandomNumbers());
    setEncodingInputs(Array(7).fill(''));
    setBitLengthInputs(Array(7).fill(''));
    setTotalBitLength('');
    setShowAnswer(false);
  };

  const handleEncodingChange = (index, value) => {
    if (/^[01]*$/.test(value)) {
        const newInputs = [...encodingInputs];
        newInputs[index] = value;
        setEncodingInputs(newInputs);
    }
  };

  const handleBitLengthChange = (index, value) => {
    if (/^\d*$/.test(value)) {
        const newInputs = [...bitLengthInputs];
        newInputs[index] = value;
        setBitLengthInputs(newInputs);
    }
  };

  const handleTotalBitLengthChange = (value) => {
    if (/^\d*$/.test(value)) {
        setTotalBitLength(value);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div>
      <Huffman 
        randomCharacters={randomCharacters} 
        randomNumbers={randomNumbers} 
        encodingInputs={encodingInputs}
        bitLengthInputs={bitLengthInputs}
        totalBitLength={totalBitLength}
        onEncodingChange={handleEncodingChange}
        onBitLengthChange={handleBitLengthChange}
        onTotalBitLengthChange={handleTotalBitLengthChange}
        showAnswer={showAnswer}
      />
      <div className='styled-container'>
        <button className='styled-button' onClick={regenerate}>Generate New</button>
        {!showAnswer && <button className='styled-button' onClick={toggleAnswer}>Show Answer</button>}
      </div>

      {/* <HuffmanTree 
        key={randomNumbers.join('-')}
        randomCharacters={randomCharacters} 
        randomNumbers={randomNumbers} 
      /> */}
      <Test 
        randomNumbers={randomNumbers}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Welcome to the QHUF Page!</h2>
        <p>(1) Report the total bits used (sum of length times frequency for each letter).</p>
        <p>(2) Show a correct Huffman code for each letter.</p>
        <p>You'll see a "Correct!" message once you've successfully calculated the total bits and generated the Huffman codes.</p>
        <p>Click "Generate New" to create a new practice quiz.</p>
        <p>Tap anywhere to close this message.</p>
      </Modal>
    </div>
  );
};

export default Qhuf;

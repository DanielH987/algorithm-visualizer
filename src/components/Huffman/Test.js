import React, { useState } from 'react';

const Test = () => {
  const [mainRow, setMainRow] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [treeRows, setTreeRows] = useState([]);

  // Swap function
  const handleSwap = (index1, index2) => {
    const newRow = [...mainRow];
    [newRow[index1], newRow[index2]] = [newRow[index2], newRow[index1]];
    setMainRow(newRow);
  };

  // Combine function
  const handleCombine = (index) => {
    if (index < mainRow.length - 1) {
      const combinedValue = mainRow[index] + mainRow[index + 1];
      const newMainRow = [
        ...mainRow.slice(0, index),
        combinedValue,
        ...mainRow.slice(index + 2),
      ];

      const newRow = Array(mainRow.length).fill(null);
      newRow[index] = mainRow[index];
      newRow[index + 1] = mainRow[index + 1];

      setMainRow(newMainRow);
      setTreeRows([newRow, ...treeRows]);
    }
  };

  return (
    <div>
      <h2>Main Row</h2>
      <div style={{ display: 'flex' }}>
        {mainRow.map((value, index) => (
          <div key={index} style={nodeStyle}>
            {value}
            <button onClick={() => handleCombine(index)}>Combine</button>
          </div>
        ))}
      </div>
      
      <h3>Swap Nodes</h3>
      <div style={{ display: 'flex' }}>
        {mainRow.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSwap(index, (index + 1) % mainRow.length)}
          >
            Swap {index} with {(index + 1) % mainRow.length}
          </button>
        ))}
      </div>

      <h2>Tree Rows</h2>
      {treeRows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((value, index) => (
            <div key={index} style={nodeStyle}>
              {value !== null ? value : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Node styling
const nodeStyle = {
  border: '1px solid black',
  padding: '10px',
  margin: '5px',
  minWidth: '30px',
  textAlign: 'center',
};

export default Test;

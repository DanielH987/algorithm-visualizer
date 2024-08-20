import React, { useState, useEffect } from "react";

// Helper function to create a new tree node
function createNode(value, left = null, right = null) {
  return { value, left, right };
}

const TreeNode = ({ node, onSwapLeft, onSwapRight, onAddAdjacent, index, canAdd }) => {
  if (!node) return null;

  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <div>{node.value}</div>
      <div>
        <button onClick={onSwapLeft} disabled={index === 0}>
          Swap Left
        </button>
        <button onClick={onSwapRight} disabled={index === canAdd}>
          Swap Right
        </button>
        {canAdd && <button onClick={onAddAdjacent}>Add Adjacent</button>}
      </div>

      {/* Render Children Below */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        {node.left && <TreeNode node={node.left} />}
        {node.right && <TreeNode node={node.right} />}
      </div>
    </div>
  );
};

const Test = ({ randomNumbers }) => {
  const [mainRow, setMainRow] = useState(randomNumbers.map((val) => createNode(val)));

  // Sync state with updated props when randomNumbers changes
  useEffect(() => {
    setMainRow(randomNumbers.map((val) => createNode(val)));
  }, [randomNumbers]);

  const swapNodes = (index1, index2) => {
    const newRow = [...mainRow];
    [newRow[index1], newRow[index2]] = [newRow[index2], newRow[index1]];
    setMainRow(newRow);
  };

  const addNodes = (index) => {
    if (index < 0 || index >= mainRow.length - 1) return;

    // Create a new parent node with the sum of two adjacent nodes
    const leftNode = mainRow[index];
    const rightNode = mainRow[index + 1];
    const newNode = createNode(leftNode.value + rightNode.value, leftNode, rightNode);

    // Update the main row
    const newRow = [...mainRow];
    newRow.splice(index, 2, newNode); // Replace two nodes with the new parent node
    setMainRow(newRow);
  };

  return (
    <div>
      <h2>Dynamic Tree</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {mainRow.map((node, index) => (
          <div key={index} style={{ margin: "0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TreeNode
              node={node}
              index={index}
              canAdd={index < mainRow.length - 1}
              onSwapLeft={() => index > 0 && swapNodes(index, index - 1)}
              onSwapRight={() => index < mainRow.length - 1 && swapNodes(index, index + 1)}
              onAddAdjacent={() => addNodes(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;

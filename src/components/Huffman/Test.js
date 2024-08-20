import React, { useState } from "react";

// Component for rendering a node
const Node = ({ value, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "5px",
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      {value}
    </div>
  );
};

// Recursive Tree Node Component
const TreeNode = ({ node }) => {
  if (!node) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <div>{node.value}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {node.children &&
          node.children.map((child, index) => (
            <div key={index} style={{ margin: "0 10px" }}>
              <TreeNode node={child} />
            </div>
          ))}
      </div>
    </div>
  );
};

const HuffmanTreeComponent = () => {
  const [mainRow, setMainRow] = useState([5, 3, 8, 2, 6, 1, 7]);
  const [treeNodes, setTreeNodes] = useState([]);

  // Swap nodes
  const swapNodes = (index1, index2) => {
    const newRow = [...mainRow];
    [newRow[index1], newRow[index2]] = [newRow[index2], newRow[index1]];
    setMainRow(newRow);
  };

  // Combine adjacent nodes
  const combineNodes = (index) => {
    const newRow = [...mainRow];
    const combinedValue = newRow[index] + newRow[index + 1];

    // Create parent node with children
    const parentNode = {
      value: combinedValue,
      children: [
        { value: newRow[index] },
        { value: newRow[index + 1] },
      ],
    };

    // Remove the two nodes and replace them with the parent node
    newRow.splice(index, 2, combinedValue);
    setMainRow(newRow);
    setTreeNodes([...treeNodes, parentNode]);
  };

  return (
    <div>
      <h3>Main Row</h3>
      <div>
        {mainRow.map((value, index) => (
          <Node
            key={index}
            value={value}
            onClick={() =>
              index < mainRow.length - 1 ? combineNodes(index) : null
            }
          />
        ))}
      </div>

      <h3>Swap Nodes</h3>
      <div>
        {mainRow.map((value, index) => (
          <button
            key={index}
            onClick={() =>
              index < mainRow.length - 1 ? swapNodes(index, index + 1) : null
            }
          >
            Swap {value} with {mainRow[index + 1] ?? "N/A"}
          </button>
        ))}
      </div>

      <h3>Tree Structure</h3>
      <div>
        {treeNodes.map((node, index) => (
          <TreeNode key={index} node={node} />
        ))}
      </div>
    </div>
  );
};

export default HuffmanTreeComponent;

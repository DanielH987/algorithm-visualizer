import React, { useState, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./Test.css";

function createNode(value, left = null, right = null) {
  return { value, left, right };
}

const ItemTypes = {
  NODE: "node",
};

const TreeNode = ({ node, onDrop, index, isRootNode }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.NODE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isRootNode,
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.NODE,
    drop: (draggedItem, monitor) => {
      if (draggedItem.index !== index && isRootNode) {
        const dropPosition = monitor.getClientOffset();
        onDrop(draggedItem.index, index, dropPosition);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: () => isRootNode,
  });

  if (!node) return null;

  return (
    <div
      ref={(node) => isRootNode && dragRef(dropRef(node))}
      className="tree-node-container"
    >
      <div className={`tree-node ${isOver ? "highlight" : ""}`}>{node.value}</div>

      <div className="tree-children">
        {node.left && <TreeNode node={node.left} isRootNode={false} />}
        {node.right && <TreeNode node={node.right} isRootNode={false} />}
      </div>
    </div>
  );
};

const Test = ({ randomNumbers }) => {
  const [mainRow, setMainRow] = useState([1,2,3,4,5,6,7].map((val) => createNode(val)));
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [pendingMove, setPendingMove] = useState({ fromColIndex: null, toColIndex: null });

  useEffect(() => {
    setMainRow([1,2,3,4,5,6,7].map((val) => createNode(val)));
  }, [randomNumbers]);

  const swapNodes = (index1, index2) => {
    const newRow = [...mainRow];
    [newRow[index1], newRow[index2]] = [newRow[index2], newRow[index1]];
    setMainRow(newRow);
  };

  const addNodes = (fromIndex, toIndex) => {
    if (fromIndex === null || toIndex === null) return;
  
    const node1 = mainRow[fromIndex];
    const node2 = mainRow[toIndex];
  
    const leftNode = node1.value < node2.value ? node1 : node2;
    const rightNode = node1.value < node2.value ? node2 : node1;
  
    const newNode = createNode(leftNode.value + rightNode.value, leftNode, rightNode);
  
    const newRow = [...mainRow];
    newRow.splice(Math.min(fromIndex, toIndex), 2, newNode);
    setMainRow(newRow);
  };

  const handleDrop = (fromIndex, toIndex, position) => {
    setDropdownPosition({ top: position.y, left: position.x });
    setPendingMove({ fromColIndex: fromIndex, toColIndex: toIndex });
    setShowDropdown(true);
  };

  const handleOptionSelect = (option) => {
    const { fromColIndex, toColIndex } = pendingMove;
    if (option === "Swap Nodes") {
      swapNodes(fromColIndex, toColIndex);
    } else if (option === "Add Nodes" && areNodesAdjacent(fromColIndex, toColIndex)) {
      addNodes(fromColIndex, toColIndex);
    }
    setShowDropdown(false);
  };

  const areNodesAdjacent = (index1, index2) => {
    return Math.abs(index1 - index2) === 1;
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const { fromColIndex, toColIndex } = pendingMove;
  const nodesAreAdjacent = fromColIndex !== null && toColIndex !== null && areNodesAdjacent(fromColIndex, toColIndex);

  return (
    <div>
      <h2>Huffman Tree</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {mainRow.map((node, index) => (
          <div key={index} className="tree-node-wrapper">
            <TreeNode
              node={node}
              index={index}
              onDrop={handleDrop}
              isRootNode={true}
            />
          </div>
        ))}
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <ul>
            <li onClick={() => handleOptionSelect("Swap Nodes")}>Swap Nodes</li>
            <li
              onClick={() => handleOptionSelect("Add Nodes")}
              className={!nodesAreAdjacent ? "disabled" : ""}
            >
              Add Nodes
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Test;

import React from "react";
import "./LoadingSpinner.css";

/**
 * Central‑fallback loading component.
 * It displays a tiny CSS spinner and a short, context‑aware message
 * based on the current URL path.
 */
const messages = {
  "/build-max-heap": "Building a max‑heap…",
  "/partition": "Preparing the partition visualizer…",
  "/binary-search-tree": "Setting up the binary‑search‑tree quiz…",
  "/longest-common-subsequence": "Generating two random strings for LCS…",
  "/huffman-encoding": "Creating Huffman‑encoding data…",
  "/minimum-spanning-tree": "Generating a minimum‑spanning‑tree graph…",
};

const LoadingSpinner = () => {
  const path = window.location.pathname;
  const message = messages[path] || "Loading…";
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;

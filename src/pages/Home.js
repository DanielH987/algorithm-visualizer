import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Welcome Section */}
      <section style={styles.section}>
        <h2>Welcome to the Algorithm Visualizer</h2>
        <p>
          This web app helps you practice and understand complex algorithms through interactive visualizations. 
          Perfect for improving your coding skills and understanding data structures better!
        </p>
      </section>

      {/* Algorithm Overview Section */}
      <section style={styles.section}>
        <h3>Available Algorithms</h3>
        <div style={styles.algorithmGrid}>
          {algorithms.map((algorithm) => (
            <div key={algorithm.name} style={styles.algorithmCard}>
              <h4>{algorithm.name}</h4>
              <p>{algorithm.description}</p>
              <Link to={algorithm.path}>
                <button style={styles.tryNowButton}>Try Now</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* User Benefits Section */}
      <section style={{ ...styles.section, textAlign: 'left' }}>
        <h3>Why Practice with this Visualizer?</h3>
        <ul>
          <li>Improve coding skills and algorithm knowledge.</li>
          <li>Understand data structures and how they work.</li>
          <li>Visualize complex algorithms step by step for better retention.</li>
          <li>Interactive learning makes algorithms more approachable and less intimidating.</li>
          <li>Experiment with custom inputs to see how algorithms respond to different data sets.</li>
          <li>Learn at your own pace with intuitive controls and easy-to-follow animations.</li>
        </ul>
      </section>
    </div>
  );
};

// Algorithm data with paths for linking
const algorithms = [
  { name: 'BUILD-MAX-HEAP', description: 'Transforms an array into a max heap.', path: '/build-max-heap' },
  { name: 'PARTITION', description: 'Partitions an array into two sub-arrays based on a pivot element.', path: '/partition' },
  { name: 'BINARY SEARCH TREE', description: 'A tree-based data structure used for fast lookups, insertions, and deletions.', path: '/binary-search-tree' },
  { name: 'LONGEST COMMON SUBSEQUENCE', description: 'Finds the longest subsequence common to two sequences.', path: '/longest-common-subsequence' },
  { name: 'HUFFMAN ENCODING', description: 'A compression algorithm that reduces the size of data using variable-length codes.', path: '/huffman-encoding' },
  { name: 'MINIMUM SPANNING TREE', description: 'Finds the minimum weight spanning tree in a graph.', path: '/minimum-spanning-tree' }
];

// Styles
const styles = {
  section: {
    padding: '40px 20px',
    backgroundColor: '#333',
    color: '#fff',
    borderBottom: '1px solid #444',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
  },
  algorithmGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '40px',
    padding: '0 20px',
  },
  algorithmCard: {
    padding: '30px',
    backgroundColor: '#444',
    color: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  algorithmCardHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
  },
  tryNowButton: {
    marginTop: '15px',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  tryNowButtonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
};

export default Home;

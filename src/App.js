import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Algorithm1 from './components/Algorithm1';
import Algorithm2 from './components/Algorithm2';
import Algorithm3 from './components/Algorithm3';
import Algorithm4 from './components/Algorithm4';
import Algorithm5 from './components/Algorithm5';
import Algorithm6 from './components/Algorithm6';

function Home() {
  return (
    <div>
      <h1>Welcome to the Algorithm Visualizer</h1>
      <p>This website provides interactive visualizations of different computer science algorithms.</p>
      <h2>Algorithms:</h2>
      <ul>
        <li><Link to="/algorithm1">Algorithm 1</Link></li>
        <li><Link to="/algorithm2">Algorithm 2</Link></li>
        <li><Link to="/algorithm3">Algorithm 3</Link></li>
        <li><Link to="/algorithm4">Algorithm 4</Link></li>
        <li><Link to="/algorithm5">Algorithm 5</Link></li>
        <li><Link to="/algorithm6">Algorithm 6</Link></li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algorithm1" element={<Algorithm1 />} />
        <Route path="/algorithm2" element={<Algorithm2 />} />
        <Route path="/algorithm3" element={<Algorithm3 />} />
        <Route path="/algorithm4" element={<Algorithm4 />} />
        <Route path="/algorithm5" element={<Algorithm5 />} />
        <Route path="/algorithm6" element={<Algorithm6 />} />
      </Routes>
    </Router>
  );
}

export default App;

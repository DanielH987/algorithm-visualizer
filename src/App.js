import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Qhp from './pages/Qhp';
import Qlcs from './pages/Qlcs';
import Qbst from './pages/Qbst';
import Qqp from './pages/Qqp';
import Qhuf from './pages/Qhuf';
import Qmst from './pages/Qmst';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build-max-heap" element={<Qhp />} />
            <Route path="/partition" element={<Qqp />} />
            <Route path="/binary-search-tree" element={<Qbst />} />
            <Route path="/longest-common-subsequence" element={<Qlcs />} />
            <Route path="/huffman-encoding" element={<Qhuf />} />
            <Route path="/minimum-spanning-tree" element={<Qmst />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </DndProvider>
  );
};

export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Analytics } from "@vercel/analytics/react"
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';

// Lazy-load each algorithm page so its code (and heavy deps like three.js
// from react-force-graph) only downloads when a visitor opens that route.
// This keeps the initial bundle small and eases build memory pressure.
const Qhp = lazy(() => import('./pages/Qhp'));
const Qlcs = lazy(() => import('./pages/Qlcs'));
const Qbst = lazy(() => import('./pages/Qbst'));
const Qqp = lazy(() => import('./pages/Qqp'));
const Qhuf = lazy(() => import('./pages/Qhuf'));
const Qmst = lazy(() => import('./pages/Qmst'));

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <Nav />
        <main>
          <Suspense fallback={<div>Loading…</div>}>
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
          </Suspense>
        </main>
        <Footer />
        <Analytics />
      </Router>
    </DndProvider>
  );
};

export default App;

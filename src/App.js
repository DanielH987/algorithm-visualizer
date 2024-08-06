import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qhp" element={<Qhp />} />
          <Route path="/qqp" element={<Qqp />} />
          <Route path="/qbst" element={<Qbst />} />
          <Route path="/qlcs" element={<Qlcs />} />
          <Route path="/qhuf" element={<Qhuf />} />
          <Route path="/qmst" element={<Qmst />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

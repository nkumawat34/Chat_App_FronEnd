import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Join from './Join';
import Chat from './Chat';
import React, { useRef } from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

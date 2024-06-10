import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Join from './Join';
import Chat from './Chat';
import React, { useRef } from 'react';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;

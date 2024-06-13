
import './App.css';
import React from 'react';
import Editor from './components/Editor';
import { Routes, Route, Navigate}  from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function App() {
  return (
   <Router>
   <Routes>
    <Route path='/' element={<Navigate replace to ={`/docs/${uuid()}`} />} />
    <Route path='/docs/:id' element={<Editor/>} />
   </Routes>
   </Router>
  );
}

export default App;

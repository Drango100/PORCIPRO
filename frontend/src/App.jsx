// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Ingreso from './page/Ingreso.marrana';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingreso" element={<Ingreso />} />
    </Routes>
  );
}

export default App;

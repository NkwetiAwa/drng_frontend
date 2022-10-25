import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './Components/NavBar';
import Home from './Screens/Home';
import Appointment from './Screens/Appointment';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/:appointment_id" element={<Appointment />} />
      </Routes>
    </Router>
  );
}

export default App;

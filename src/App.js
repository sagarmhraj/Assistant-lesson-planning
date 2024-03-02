// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signuppage';
import Open from './pages/Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/sign-in" element={<SigninPage />} />
        <Route path="/page" element={<Open />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

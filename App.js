import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/logincompo/Login';
import OtpPage from './components/otpcompo/OtpPage';
import Register from './components/registercompo/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/otp/:userId" element={<OtpPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;

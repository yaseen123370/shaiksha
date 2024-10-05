import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const OtpPage = () => {
    const { userId } = useParams(); // Get userId from route params
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send OTP to backend for validation
            const response = await axios.post(`http://localhost:5000/api/users/verify-otp`, { userId, otp });

            if (response.data.success) {
                toast.success('OTP verified successfully!');
                navigate('/login'); // Navigate to login page after success
            } else {
                toast.error('Incorrect OTP!');
            }
        } catch (err) {
            toast.error('Error verifying OTP');
            console.error(err);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-6">
                    <h2 className="text-center">Enter OTP</h2>
                    <form onSubmit={handleOtpSubmit}>
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label">OTP</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="otp" 
                                name="otp" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default OtpPage;

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Custom CSS for any additional styling or animations

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const { emailOrPhone, password } = formData;

        // Validate email or phone number
        if (!emailOrPhone) {
            newErrors.emailOrPhone = "Email or phone number is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(emailOrPhone) && !/^\d{10}$/.test(emailOrPhone)) {
            newErrors.emailOrPhone = "Enter a valid email address or 10-digit phone number.";
        }

        // Validate password
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/users/login', formData);
                toast.success("Login successful!", {
                    position: toast.POSITION.TOP_CENTER
                });

                // Redirect to home page after successful login
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } catch (err) {
                toast.error("Invalid email/phone or password!", {
                  
                });
                setErrors({});
            }
        }
    };

    return (
        <div className="container-fluid login-container d-flex justify-content-center align-items-center vh-100">
            <ToastContainer />
            <form className="login-form bg-white p-4 rounded shadow-lg" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Login</h2>

                <div className="mb-3">
                    <label htmlFor="emailOrPhone" className="form-label">Email or Phone Number</label>
                    <input
                        type="text"
                        className={`form-control ${errors.emailOrPhone ? 'is-invalid' : ''}`}
                        id="emailOrPhone"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        placeholder="Enter email or phone number"
                    />
                    {errors.emailOrPhone && <div className="invalid-feedback">{errors.emailOrPhone}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>

                <p className="text-center mt-3">
                    Don't have an account? <a href="/register">Create account</a>
                </p>
            </form>
        </div>
    );
};

export default Login;

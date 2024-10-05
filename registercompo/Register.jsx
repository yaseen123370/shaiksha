import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Custom CSS

const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
];

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneCode: '+91',
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const { name, email, phone, password } = formData;

        if (!name) newErrors.name = "Name is required.";
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid.";
        }
        if (!phone) newErrors.phone = "Phone number is required.";
        if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits.";
        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long.";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                // Make POST request to backend for registration
                const response = await axios.post('http://localhost:5000/api/users/register', formData);

                toast.success('User registered successfully! OTP sent to your email.');

                // Navigate to OTP page
                navigate(`/otp/${response.data.userId}`);

            } catch (err) {
                toast.error('Error registering user');
                console.error('Error registering user:', err.response.data);
            }
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-6">
                    <div className="register-container">
                        <h2 className="text-center">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <div className="d-flex">
                                    <select 
                                        className="form-select phone-code" 
                                        name="phoneCode" 
                                        value={formData.phoneCode}
                                        onChange={handleChange}
                                    >
                                        {countryCodes.map(({ code, country }) => (
                                            <option key={code} value={code}>
                                                {code} {country}
                                            </option>
                                        ))}
                                    </select>
                                    <input 
                                        type="tel" 
                                        className="form-control phone-input" 
                                        id="phone" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.phone && <div className="text-danger">{errors.phone}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                        <ToastContainer /> {/* Toastify container */}
                        <p className="text-center mt-3">
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

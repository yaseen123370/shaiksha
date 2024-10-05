const User = require('../models/userModel');
const nodemailer = require('nodemailer');


        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use Gmail, Yahoo, or any other service
            auth: {
                user: 'valishaik540@gmail.com', // Your Gmail address
                pass: 'ssup mrrv esbp pqcu', // Your Gmail app password (use app-specific password for security)
            },
        });
        
        const generateOtp = () => {
            return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        };
        
        // Register User and send OTP
        const registerUser = async (req, res) => {
            try {
                const { name, email, phoneCode, phone, password } = req.body;
        
                // Check if the user already exists
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: 'User already exists with this email.' });
                }
        
                // Generate OTP
                const otp = generateOtp();
        
                // Create a new user object with OTP
                const newUser = new User({
                    name,
                    email,
                    phoneCode,
                    phone,
                    password, // Ideally, hash the password before saving
                    otp, // Store OTP in the database for verification
                    otpExpires: Date.now() + 10 * 60 * 1000, // OTP expires in 10 minutes
                });
        
                // Save the user to the database
                await newUser.save();
        
                // Send OTP to user's email
                const mailOptions = {
                    from: 'valishaik540@gmail.com',
                    to: email,
                    subject: 'Your OTP for Verification',
                    text: `Hello ${name}, your OTP for registration is ${otp}. This OTP is valid for 10 minutes.`,
                };
        
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        return res.status(500).json({ error: 'Failed to send OTP email.' });
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
        
                res.status(201).json({ message: 'User registered successfully. OTP sent to email.', userId: newUser._id });
        
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Server error' });
            }
        };
        
        // Verify OTP
        const verifyOtp = async (req, res) => {
            try {
                const { userId, otp } = req.body;
        
                // Find the user by ID
                const user = await User.findById(userId);
        
                if (!user) {
                    return res.status(400).json({ error: 'User not found.' });
                }
        
                // Check if OTP is correct and not expired
                if (user.otp !== otp || Date.now() > user.otpExpires) {
                    return res.status(400).json({ success: false, error: 'Invalid or expired OTP.' });
                }
        
                // OTP is valid, clear the OTP fields in the database
                user.otp = null;
                user.otpExpires = null;
                await user.save();
        
                res.status(200).json({ success: true, message: 'OTP verified successfully.' });
        
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Server error during OTP verification.' });
            }
        };
        
        module.exports = {
            registerUser,
            verifyOtp,
        };
        
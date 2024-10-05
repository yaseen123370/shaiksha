const express=require('express');

const cors = require('cors');
const userRouter = require('./routes/userRoutes'); 

const connectDB=require('./config/db');

// Connect to MongoDB
connectDB();


const app=express();
app.use(cors());

// Define middleware
app.use(express.json());

app.use('/api/users', userRouter);

const port=5000
app.listen(port, ()=>console.log(`Server running on port ${port}`));

module.exports=app;

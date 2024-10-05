const mongoose = require('mongoose')

const connectDB=()=>{
    mongoose.connect('mongodb+srv://mominshaiksha786:AyTEJeeOhRzJmx52@cluster0.jdrkc.mongodb.net/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    })
   .then(()=>console.log('MongoDB Connected...'))
   .catch((error)=>{
    console.log("Error connecting to MongoDB", error)
   })
}

module.exports = connectDB
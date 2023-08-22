// Basic Lib Import
const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');

// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
require('dotenv').config();

// Database Lib Import
const mongoose =require('mongoose');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// Mongo DB Database Connection
if (!process.env.DB_HOST) {
    console.error('DB_HOST environment variable is not set.');
    process.exit(1); // Exit the application or handle the error accordingly
  }
let URI=process.env.DB_HOST;

mongoose.connect(URI)
  .then(() => {
    console.log('Connection Success');
  })
  .catch((error) => {
    console.log(error);
  });


// Routing Implement
app.use("/api/v1",router)

// // Undefined Route Implement
// app.use("*",(req,res)=>{
//     res.status(404).json({status:"fail",data:"Not Found"})
// })


module.exports=app;

















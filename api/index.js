import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Database Connection
mongoose
    .connect(process.env.MONGO,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
    console.log('Connected to MongoDB!');
    })
    .catch((err)=>{
        console.log(err);
    })

const app = express();
app.use(express.json());


const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
    }
);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({sucess: false ,statusCode,message});
});
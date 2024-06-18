import userRoute from "./routes/userRoutes.js";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Database Connection
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();


const PORT = 3000;
const usePort = process.env.PORT || PORT;
app.listen(usePort, () => {
    console.log(`Server is running on port ${usePort}`);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(userRoute);



import userRoute from "./routes/userRoutes.js";
import express from "express";
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

// Middleware

// Routes
app.use(userRoute);

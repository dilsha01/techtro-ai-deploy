import userRoute from "./routes/userRoutes.js";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"; // Add this line to import the path module
import { fileURLToPath } from 'url'; // Add this to handle __dirname in ES modules


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

const __dirname = path.resolve();

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

app.use(express.static(path.join(__dirname + "/aiApp/dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname , "aiApp","dist","index.html"));
})

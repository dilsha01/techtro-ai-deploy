import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = {
    activation: (data) => {
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "10h",
        });
    },
    refresh: (data) => {
        return jwt.sign(data, process.env.REFRESH_TOKEN, {
            expiresIn: "1d",
        });
    },
    access: (data) => {
        return jwt.sign(data, process.env.ACCESS_TOKEN, {
            expiresIn: "15m",
        });
    },
};

export default createToken;

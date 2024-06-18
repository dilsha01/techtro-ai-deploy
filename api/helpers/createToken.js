import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = {
    activation: (data) => {
        return jwt.sign(data, process.env.ACTVATION_TOKEN, {
            expiresIn: "1d",
        });
    },
    // Other token functions can be added here
};

export default createToken;

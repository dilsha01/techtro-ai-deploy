import sendMail from "../helpers/sendMail.js";
import validateEmail from "../helpers/validateEmail.js";
import createToken from "../helpers/createToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const userController = {
    register: async (req, res) => {
        try {
            // Get info
            const { name, email, password } = req.body;

            // Check fields
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Email format
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }

            // Check if user already exists
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Check password length
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" });
            }

            // Hash password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user object
            const newUser = {
                name,
                email,
                password: hashedPassword
            };

            // Create token
            const activation_token = createToken.activation(newUser); // Assuming createToken function works correctly

            // Send email 
            const url = `http://localhost:3000/activate/${activation_token}`;
            sendMail.sendEmailRegister(email, name, url);

            // Registration successful
            res.status(200).json({ message: "Welcome, please check your email to activate your account" });
            
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default userController;
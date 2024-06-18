import { sendEmailRegister, sendEmailReset } from '../helpers/sendMail.js';
import validateEmail from "../helpers/validateEmail.js";
import createToken from "../helpers/createToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userController = {
  register: async (req, res) => {
    try {
      // Get info
      const { username, email, password } = req.body;

      // Check fields
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Email format
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check if user already exists
      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "This email is already registered in our system." });

      // Check password length
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      // Hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user object
      const newUser = {
        username,
        email,
        password: hashedPassword
      };

      // Save new user to database
      const createdUser = await User.create(newUser);

      // Create token
      const activation_token = createToken.activation(newUser);

      // Send email 
      const url = `http://localhost:3000/activate/${activation_token}`;
      await sendEmailRegister(email, username, url);

      // Registration successful
      res.status(200).json({ message: "Registration successful. Please check your email to activate your account" });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: err.message });
    }
  },
  activate: async (req, res) => {
    try {
      // Get token
      const { activation_token } = req.body;

      //veify token
      const user = jwt.verify(activation_token, process.env.JWT_SECRET);   
      const { username, email, password } = user;

      //check user
      const check = await User.findOne({ email });
      if (check)
        return res
          .status(400)
          .json({ msg: "This email is already registered." });

      //add user to database
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(200).json({ message: "Account has been activated,you can now sign in" });

      //activation sucessful
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

  },
  signing: async (req, res) => {
    try {
      // Get credentials
      const { email, password } = req.body;

      // Check email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "This email is not registered" });

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      // Refresh token
      const rf_token = createToken.refresh({ id: user._id });
      res.cookie('_apprftoken', rf_token, {
        httpOnly: true,
        path: '/api/auth/access',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      });

      // Send response indicating successful sign-in
      res.status(200).json({ msg: "Sign in successful" });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  access: async (req, res) => {
    try {
      // Retrieve rf_token from cookies
      const rf_token = req.cookies._apprftoken;
      if (!rf_token) return res.status(400).json({ msg: "Please sign in." });

      // Verify rf_token
      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please sign in again." });

        // Create access token
        const ac_token = createToken.access({ id: user.id });

        // Access successful
        return res.status(200).json({ ac_token });
      });

    } catch (err) {
      console.error("Access error:", err);
      res.status(500).json({ message: err.message });
    }
  },
  forgot: async (req, res) => {
    try {
      // Get email from request body
      const { email } = req.body;
  
      // Ensure email is provided
      if (!email) return res.status(400).json({ msg: "Email is required" });
  
      // Check if user with given email exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "This email is not registered" });
  
      // Create access token for password reset
      const ac_token = createToken.access({ id: user._id });
  
      // Construct the password reset URL
      const url = `http://localhost:3000/reset-password/${ac_token}`;
      const name = user.username;
  
      // Send password reset email
      await sendEmailReset(email, name, url);
  
      // Respond with success message
      res.status(200).json({ msg: "Password reset email sent, please check your inbox" });
  
    } catch (err) {
      console.error("Forgot password error:", err);
      res.status(500).json({ message: err.message });
    }
  },
  
  reset: async (req, res) => {
    try {
      // Get password from request body
      const  {password}  = req.body;

      // Validate password
      if (!password) {
        return res.status(400).json({ msg: "Password is required" });
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // Use salt rounds like 10
  
      // Update the user's password in the database
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user.id }, // Find user by ID from decoded token
        { password: hashedPassword }, // Update password field
        { new: true } // Return updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Password reset successful response
      res.status(200).json({ msg: "Password reset successfully." });
    } catch (err) {
      // Handle errors
      console.error("Password reset error:", err);
      res.status(500).json({ message: err.message });
    }
  },
  
  info: async (req, res) => {
    try {
      // get info -password
      const user = await User.findById(req.user.id).select("-password");
      // return user
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      // get info
      const { name, avatar } = req.body;

      // update
      await User.findOneAndUpdate({ _id: req.user.id }, { name, avatar });
      // success
      res.status(200).json({ msg: "Update success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};






export default userController;

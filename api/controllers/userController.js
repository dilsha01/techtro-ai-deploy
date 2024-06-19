import { sendEmailRegister, sendEmailReset } from '../helpers/sendMail.js';
import validateEmail from "../helpers/validateEmail.js";
import createToken from "../helpers/createToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userController = {

//Checked Correct
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

      // Create token
      const activation_token = createToken.activation(newUser);

      // Send email 
      const url = `http://localhost:5173/activate/${activation_token}`;
      await sendEmailRegister(email, username, url);

      // Registration successful
      res.status(200).json({ message: "Registration successful. Please check your email to activate your account" });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: err.message });
    }
  },
  
  //Checked Correct
  activate: async (req, res) => {
    try {
      // Get token
      const { activation_token } = req.body;
      console.log(activation_token);
      //veify token
      const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN); 
      console.log(user);  
      
      const { username, email, password } = user;
       
      //check user
      const check = await User.findOne({ email });
      console.log(check);
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

  //Checked Correct
  signing: async (req, res) => {
    try {
      // Get credentials
      const { email, password } = req.body;
      console.log(req.body);
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
      console.log("Sign in successful");


    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  //Checked Correct
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

  //Checked Correct
  forgot: async (req, res) => {
    try {
      // get email
      const { email } = req.body;
      console.log(email);
      // check email
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "This email is not registered in our system." });

      // create ac token
      const ac_token = createToken.access({ id: user.id });

      // send email
      const url = `http://localhost:5173/reset-password/${ac_token}`;
      const username = user.username;
      await sendEmailReset(email, username, url);

      // success
      res
        .status(200)
        .json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

//Checked Correct
  reset: async (req, res) => {
    try {
      // get password
      const { password } = req.body;
      console.log(password);
      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      // update password
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { password: hashPassword }
      );

      // reset success
      res.status(200).json({ msg: "Password was updated successfully." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // Checked Correct
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
      const { username, avatar } = req.body;
      // update
      await User.findOneAndUpdate({ _id: req.user.id }, { username, avatar });
      // success
      res.status(200).json({ msg: "Update success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  
  signout: async (req, res) => {
    try {
      // clear cookie
      console.log("Signout");
      res.clearCookie("_apprftoken", { path: "/api/auth/access" });
      // success
      return res.status(200).json({ msg: "Signout success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  google: async (req, res) => {
    try {
      // get Token Id
      const { tokenId } = req.body;

      // verify Token Id
      const client = new OAuth2(process.env.G_CLIENT_ID);
      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.G_CLIENT_ID,
      });

      // get data
      const { email_verified, email, name, picture } = verify.payload;

      // failed verification
      if (!email_verified)
        return res.status(400).json({ msg: "Email verification failed." });

      // passed verification
      const user = await User.findOne({ email });
      // 1. If user exist / sign in
      if (user) {
        // refresh token
        const rf_token = createToken.refresh({ id: user._id });
        // store cookie
        res.cookie("_apprftoken", rf_token, {
          httpOnly: true,
          path: "/api/auth/access",
          maxAge: 24 * 60 * 60 * 1000, // 24hrs
        });
        res.status(200).json({ msg: "Signing with Google success." });
      } else {
        // new user / create user
        const password = email + process.env.G_CLIENT_ID;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          name,
          email,
          password: hashPassword,
          avatar: picture,
        });
        await newUser.save();
        // sign in the user
        // refresh token
        const rf_token = createToken.refresh({ id: user._id });
        // store cookie
        res.cookie("_apprftoken", rf_token, {
          httpOnly: true,
          path: "/api/auth/access",
          maxAge: 24 * 60 * 60 * 1000, // 24hrs
        });
        // success
        res.status(200).json({ msg: "Signing with Google success." });
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },


  hi: async (req, res) => {
    try {
      // get info -password
      const user = await User.findById(req.user.id).select("-password");
      console.log(name, avatar);
      // return user
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },




};



export default userController;

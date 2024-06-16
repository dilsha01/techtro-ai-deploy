import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const errorHandler = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return next(errorHandler(409, "User already exists!"));
      }
      next(error);
    }
  };

  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
  
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...restOfValidUser } = validUser._doc;
  
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(restOfValidUser);
    } catch (error) {
      next(error);
    }
  };
  
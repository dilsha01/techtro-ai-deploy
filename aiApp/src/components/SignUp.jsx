import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../style';
import { FcGoogle } from "react-icons/fc";
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { isEmpty, isEmail, isLength } from "../helper/validate";
import axios from "axios";
import { toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUp = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(initialState);
    const [visible, setVisible] = useState(false);
    const { username, email, password, confirmPassword } = data;

    const handleClick = () => {
        setVisible(!visible);
    };
    
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const register = async (e) => {
        e.preventDefault();
        // check fields
        if (isEmpty(username) || isEmpty(password))
          return toast("Please fill in all fields.", {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        // check email
        if (!isEmail(email))
          return toast("Please enter a valid email address.", {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        // check password
        if (isLength(password))
          return toast("Password must be at least 6 characters.", {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        // check match
        if (password != confirmPassword)
          return toast("Password did not match.", {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        try {
          const res = await axios.post("/api/auth/sign-up", {
            name,
            email,
            password,
          });
          toast(res.data.msg, {
            className: "toast-success",
            bodyClassName: "toast-success",
          });
        } catch (err) {
          toast(err.response.data.msg, {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        }
        handleReset();
      };
    
      const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        setData({ ...data, username: "", email: "", password: "", confirmpassword: "" });
      };
    
    
    
    {/* Return Form */}
    return (
        <>
        
        <div className={`max-w-lg mx-auto ${styles.paddingY}`}>

            {/* Heading */}
            <h1 className="text-4xl text-center font-semibold my-8 text-white">Sign Up</h1>

            {/* Form */}
            <form className="flex flex-col gap-6" onSubmit={register} >
                <input
                    type="text"
                    name="username"
                    placeholder="User Name"
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    id="username"
                    handleChange={handleChange}
                    
                />
                <input
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    id="email"
                    handleChange={handleChange} 
                    
                />
            
            <div className="relative">
                    <input
                        name="password"
                        type={visible ? 'text' : 'password'}
                        placeholder="Password"
                        className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                        handleChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        
                        className="absolute right-3 top-3 text-gray-400"
                    >
                        {visible ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        name="confirmPassword"
                        type={visible ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                        handleChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="absolute right-3 top-3 text-gray-400"
                    >
                        {visible ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
                </div>

                    
                {/* Button */}
                <button
        
                    type="submit"
                    className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200"
                >
                   Sign Up
                </button>

                <button
                    type="submit"
                    className="flex items-center justify-center bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200 gap-2"
                >
                    <FcGoogle />
                     Sign Up with Google
                </button>
            </form>

            {/* Footer */}
            <div className="flex gap-2 mt-5 justify-center">
                <p className="text-gray-400">Already have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500 hover:underline">Sign In</span>
                </Link>
            </div>
           
        </div>
        </>
    );
};

export default SignUp;

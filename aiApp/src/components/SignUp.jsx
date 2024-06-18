import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../style';
import { FcGoogle } from "react-icons/fc";
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';


const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => {
        setShowPassword(!showPassword);
    };
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch("http://localhost:8000/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
            navigate('/home'); // Adjust this based on your routing
        } else {
            setError(data.message);
        }
    };

    {/* Return Form */}
    return (
        
        <div className={`max-w-lg mx-auto ${styles.paddingY}`}>

            {/* Heading */}
            <h1 className="text-4xl text-center font-semibold my-8 text-white">Sign Up</h1>

            {/* Form */}
            <form className="flex flex-col gap-6" >
                <input
                    type="text"
                    placeholder="User Name"
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    id="username"
                    
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    id="email"
                    
                />
            
            <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="absolute right-3 top-3 text-gray-400"
                    >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="absolute right-3 top-3 text-gray-400"
                    >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Any Key (When you forgot your password to recover)"
                        className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        className="absolute right-3 top-3 text-gray-400"
                    >
                        {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
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
                    type="button"
                    onClick={handleSubmit}
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
    );
};

export default SignUp;

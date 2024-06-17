import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../style';

const SignUp = () => {
    

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
                    id="email"
                    
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    id="email"
                    
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    id="password"
                    
                />

                {/* Button */}
                <button
        
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition-all duration-200"
                >
                   Sign Up
                </button>

                <button
            
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition-all duration-200"
                >
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../style';

const SignIn = () => {
    

    {/* Return Form */}
    return (
        <div className={`max-w-lg mx-auto ${styles.paddingY}`}>

            {/* Heading */}
            <h1 className="text-4xl text-center font-semibold my-8 text-white">Sign In</h1>

            {/* Form */}
            <form className="flex flex-col gap-6" >

                {/* Inputs */}
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
                   Sign In
                </button>

                <button
            
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition-all duration-200"
                >
                     Sign In with Google
                </button>
            </form>

            {/* Footer */}
            <div className="flex gap-2 mt-5 justify-center">
                <p className="text-gray-400">Dont have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500 hover:underline">Sign Up</span>
                </Link>
            </div>
            
            <div className="flex gap-2  justify-center">
                <p className="text-gray-400">Forgot Password?</p>
                <Link to="/forgot-password">
                    <span className="text-blue-500 hover:underline">Recover Password</span>
                </Link>
            </div>
           
        </div>
    );
};

export default SignIn;

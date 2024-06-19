import { useState } from "react";
import styles from '../style';
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isEmpty, isEmail } from "../helper/validate";

const Reset = () => {
    const [email, setEmail] = useState(""); // State to hold the email input
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        setShowPassword(!showPassword);
    };

    const trigClick = async (e) => {
        e.preventDefault();
        if (isEmpty(email)) {
            return toast("Please fill in all fields.", {
                className: "toast-failed",
                bodyClassName: "toast-failed",
            });
        }

        if (!isEmail(email)) {
            return toast("Please enter a valid email address.", {
                className: "toast-failed",
                bodyClassName: "toast-failed",
            });
        }

        try {
            toast("Wait email is sending.", {
                className: "toast-success",
                bodyClassName: "toast-success",
            })
            const res = await axios.post("/api/auth/forgot-password", { email });
            toast(res.data.msg, {
                className: "toast-success",
                bodyClassName: "toast-success",
            })
        } catch (error) {
            toast(error.response.data.msg , {
                className: "toast-failed",
                bodyClassName: "toast-failed",
            })
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value); // Update email state on input change
    };

    
   

    return (
        <>
        <ToastContainer />
       
        <div className={`max-w-lg mx-auto ${styles.paddingY}`}>
            <h1 className="text-4xl text-center font-semibold my-8 text-white">Reset Password</h1>
            <form className="flex flex-col gap-6">
                <input
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                    type="text"
                    id="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={handleEmailChange} // Update state on change
                />
            
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={trigClick} // Call trigClick on button click
                        className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200"
                    >
                        Send Verification Email
                    </button>
                </div>
            </form>
            <div className="flex gap-2 mt-5 justify-center">
                <p className="text-gray-400">Dont have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500 hover:underline">Sign Up</span>
                </Link>
            </div>
            <div className="flex gap-2 justify-center">
                <p className="text-gray-400">Go Back</p>
                <Link to="/sign-in">
                    <span className="text-blue-500 hover:underline">Sign in</span>
                </Link>
            </div>
        </div>
        </>
    );

};
export default Reset;

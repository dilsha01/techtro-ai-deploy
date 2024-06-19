import { useState , handleChange } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../style";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {isEmpty, isMatch, isLength} from "../helper/validate"

const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetLayer = () => {
  const { token } = useParams(); // Extracts the 'token' parameter from the URL
  const [data, setData] = useState(initialState);
  const { password, confirmPassword } = data;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Assign useNavigate to navigate

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (isEmpty(password) || isEmpty(confirmPassword)) {
       toast("Please fill in all fields.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
    
    // Validation checks
    if (password.length  < 6) {
       return toast("Password must be at least 6 characters.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }

    if (password !== confirmPassword) {
      return toast("Confirm password does not match.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      
    }

    try {
      // Call backend to reset password
      const res = await axios.post("/api/auth/reset-password", 
        {password},
        {headers : {Authorization: token}}
      );
      navigate("/sign-in");
      toast("Password reset successful. You can now sign in.", {
        className: "toast-success",
        bodyClassName: "toast-success",
      });

      // Optionally redirect to sign-in page or handle success
      navigate("/sign-in");
    } catch (err) {
      toast(err.response?.data?.msg || "Password reset failed.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  return (
    <div className={`max-w-lg mx-auto ${styles.paddingY}`}>
      <ToastContainer />

      <h1 className="text-4xl text-center font-semibold my-8 text-white">
        Set new password
      </h1>

      <form className="flex flex-col gap-6" onSubmit={register}>
        <div className="relative">
          <input
            className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password" // Add the name attribute
            value={password}
            onChange={handleChange} // Corrected onChange handler
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
            className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword" // Add the name attribute
            value={confirmPassword}
            onChange={handleChange} // Corrected onChange handler
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit" // Type submit to trigger form submission
            className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetLayer;

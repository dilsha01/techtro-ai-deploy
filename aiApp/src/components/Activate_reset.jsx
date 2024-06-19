import { Link, useParams } from "react-router-dom";
import styles from "../style";
import robot from "../assets/robot.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const ResetLayer = () => {
  const { token } = useParams(); // Extracts the 'token' parameter from the URL
  onst [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
      setShowPassword(!showPassword);
  };
  useEffect(() => {
    const activateUser = async () => {


        if (isLength(password))
            return toast("Password must be at least 6 characters.", {
              className: "toast-failed",
              bodyClassName: "toast-failed",
            });
          // check match
          if (password !== confirmPassword)
            return toast("Confirm password is not match.", {
              className: "toast-failed",
              bodyClassName: "toast-failed",
            });
            
      try {
        const res = await axios.post("/api/auth/reset-password",{ activation_token: token });
        toast("Activation Successful. You can now sign in.", {
          className: "toast-success",
          bodyClassName: "toast-success",
        });
      } catch (err) {
        toast(err.response?.data?.msg || "Activation failed.", {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      }
    };

    if (token) {
      activateUser();
    }
  }, [token]); // The effect runs only when 'token' changes

  return (
    <div className={`max-w-lg mx-auto ${styles.paddingY}`}>
        <h1 className="text-4xl text-center font-semibold my-8 text-white">Set new password</h1>
        <form className="flex flex-col gap-6">
            <div className="relative">
                <input
                    className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                />
                <button
                    type="button"
                    onClick={handleClick}
                    className="absolute right-3 top-3 text-gray-400"
                >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
            </div>
        </form>
        <div className="flex justify-center mt-6">
            <button
                type="button"
                onClick={handleClick}
                className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200"
            >
                Reset Password
            </button>
        </div>
    </div>
);
};

export default ResetLayer;

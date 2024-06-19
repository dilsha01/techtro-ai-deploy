import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../style";
import { FcGoogle } from "react-icons/fc";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { isEmpty, isEmail, isLength } from "../helper/validate";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext"; // Check import path






const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const { email, password } = data;
  const { dispatch } = useContext(AuthContext); // Ensure AuthContext is correctly imported and used

  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      toast("Please fill in all fields.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      return;
    }

    if (!isEmail(email)) {
      toast("Please enter a valid email address.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      return;
    }

    if (isLength(password)) {
      toast("Password should be at least 6 characters long.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      return;
    }

    try {
      const res = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });

      localStorage.setItem("_appsigning", true);

      dispatch({ type: "SIGNING", payload: res.data });

      toast("Sign in Successful.", {
        className: "toast-success",
        bodyClassName: "toast-success",
      });

      // Redirect to another page after successful sign-in
      navigate("/"); 
    } catch (err) {
      toast(err.response?.data?.msg || "Sign in failed.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      console.error("Sign in error:", err.response?.data || err.message);
    }
  };



  return (
    <>
      <ToastContainer />
      <div className={`max-w-lg mx-auto ${styles.paddingY}`}>
        {/* Heading */}
        <h1 className="text-4xl text-center font-semibold my-8 text-white">
          Sign In
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSignIn} >
          {/* Email input */}
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400"
            value={email}
            onChange={handleChange}
          />

          {/* Password input */}
          <div className="relative">
            <input
              name="password"
              type={visible ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-500 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 w-full"
              value={password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleClick}
              className="absolute right-3 top-3 text-gray-400"
            >
              {visible ? <MdVisibility /> : <MdVisibilityOff />}
            </button>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200"
          >
            Sign In
          </button>

          {/* Sign in with Google button 
          <button
            type="button"
            className="flex items-center justify-center bg-blue-700 text-white p-3 rounded-lg uppercase hover:bg-blue-800 transition-all duration-200 gap-2"
          >
            <FcGoogle />
            Sign In with Google
          </button>*/}
        </form>

        {/* Links for Sign Up and Forgot Password */}
        <div className="flex gap-2 mt-5 justify-center">
          <p className="text-gray-400">Dont have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500 hover:underline">Sign Up</span>
          </Link>
        </div>
        <div className="flex gap-2 justify-center">
          <p className="text-gray-400">Forgot Password?</p>
          <Link to="/forgot-password">
            <span className="text-blue-500 hover:underline">
              Recover Password
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;

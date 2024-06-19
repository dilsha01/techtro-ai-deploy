import { Link, useParams } from "react-router-dom";
import styles from "../style";
import robot from "../assets/robot.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Activate = () => {
  const { token } = useParams(); // Extracts the 'token' parameter from the URL

  useEffect(() => {
    const activateUser = async () => {
      try {
        const res = await axios.post("/api/auth/activate",{ activation_token: token });
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
    <div className={`flex flex-col items-center h-screen ${styles.paddingY}`}>
      <ToastContainer />
      <p className="mt-2 font-poppins font-semibold text-3xl text-white flex items-center">
        <img src={robot} alt="logo" className="w-8 h-8 mr-2" />
        TechTro AI Solutions
      </p>
      <div className={`flex justify-center items-center h-80 ${styles.paddingY}`}>
        <Link to="/sign-in" className="text-blue-500 hover:underline text-2xl">
          Click here to activate your account and sign in
        </Link>
      </div>
    </div>
  );
};

export default Activate;

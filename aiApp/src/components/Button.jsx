import React from "react";
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link to="/sign-up" className="py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none inline-block">
      Sign Up Now
    </Link>
  );
};

export default Button;

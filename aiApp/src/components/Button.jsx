import React, { useState } from "react"; // Import React and useState
import { ButtonLinks } from "../constants"; // Assuming ButtonLinks is imported correctly

const Button = ({ styles }) => {
  const [active, setActive] = useState(""); // State to manage active button

  return (
    <>
      {ButtonLinks.map((nav, index) => (
        <button
          key={nav.id}
          type="button"
          className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${
            active === nav.title ? "text-white" : "text-dimWhite"
          } ${index === ButtonLinks.length - 1 ? "mr-0" : "mr-10"}`}
          onClick={() => setActive(nav.title)}
        >
          <a href={`${nav.id}`}>{nav.title}</a>
        </button>
      ))}
    </>
  );
};

export default Button;

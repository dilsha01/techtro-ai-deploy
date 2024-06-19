import { useState ,useContext } from "react";
import { close, menu ,robot ,people01} from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const { dispatch, isLoggedIn } = useContext(AuthContext); 

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/auth/sign-out");
      localStorage.removeItem("_appSignging");
      dispatch({ type: "SIGNOUT" });
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <nav className="w-full flex items-center justify-between navbar mt-2"> {/* Removed py-3 and py-6, adjusted flex properties */}
      
      {/* Desktop Logo Section */}
      <div>
    <p className="mt-2 font-poppins font-semibold text-3xl text-white flex items-center">
      <img src={robot} alt="logo" className="w-[32px] h-[32px] mr-2" />
      TechTro AI Solutions
    </p>
  </div>

      {/* Mobile Menu Section */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-10" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`${nav.id}`}>{nav.title}</a>
          </li>
        ))}

{isLoggedIn ? (
          <li
            className={`justify-end items-center font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Sign Out" ? "text-white" : "text-dimWhite"} mr-10`}
            onClick={handleClick}
          >
            <Link to="/">Sign Out</Link>
          </li>
        ) : (
          <li
            className={`justify-end items-center font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Sign In" ? "text-white" : "text-dimWhite"} mr-10`}
            onClick={() => setActive("Sign In")}
          >
            <Link to="/sign-in">Sign In</Link>
          </li>
        )}

      </ul>


      {/* Mobile Menu Button Section */}
      <div className="sm:hidden flex justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        {/* Mobile Menu Dropdown Section */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            
          </ul>
        </div>
      </div>

      
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import styles from '../style';
import robot from '../assets/robot.png'; // Assuming the correct path to your robot image

const Activate = () => {
  return (
    <div className={`flex flex-col items-center h-screen ${styles.paddingY}`}>
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

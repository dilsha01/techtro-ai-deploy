import React from "react";
import styles from "../style";
import { robotArm } from "../assets";

const About = () => {
  return (
    <section id="about" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <h2 className="font-poppins font-semibold text-4xl text-white mb-4">
          About Us
        </h2>
        <p className={`${styles.paragraph} max-w-[700px]`}>
          TechTro AI Solutions is dedicated to providing cutting-edge artificial intelligence solutions. Our mission is to empower creativity, clarity, and financial insight through innovative technologies.
        </p>
        <p className={`${styles.paragraph} max-w-[700px] mt-4`}>
          We specialize in tailored AI assistance, image generation, and financial management tools that cater to diverse business needs. Whether you're a startup or an enterprise, TechTro AI Solutions is here to support your growth and success.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robotArm} alt="billing" className="w-[100%] h-[60%] relative z-[5]" />
        
      </div>
    </section>
  );
};

export default About;

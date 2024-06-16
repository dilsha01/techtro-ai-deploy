import React from "react";
import styles from "../style";
import { contactDetails } from "../constants";

const Contacts = () => {
  return (
    <section id="contact" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <h2 className="font-poppins font-semibold text-4xl text-white mb-4">
          Contact Us
        </h2>
        <p className={`${styles.paragraph} max-w-[700px]`}>
          TechTro AI Solutions is here to assist you. Contact us for innovative AI solutions tailored to your needs.
        </p>
        <p className={`${styles.paragraph} max-w-[700px] mt-4`}>
          For inquiries and support, please reach out using the following contact details:
        </p>
        
        <ul className="mt-4">
          {contactDetails.map((detail, index) => (
            <li key={index} className={`${styles.paragraph} text-white`}>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <iframe
          title="Google Maps"
          className="absolute top-0  w-[80%] h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.24499454408385!2d79.88251138457407!3d6.774728551569176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24507002bb61f%3A0x80d7a637940bee2c!2sMoratuwa!5e0!3m2!1sen!2slk!4v1718515138413!5m2!1sen!2slk"
          frameBorder="0"
          style={{ border: 5, borderRadius: 20 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        />
        
      </div>
    </section>
  );
};

export default Contacts;

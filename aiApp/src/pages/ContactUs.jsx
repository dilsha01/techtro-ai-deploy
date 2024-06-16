import styles from "../style";
import {  Footer, Navbar, Contacts } from "../components";
const ContactUs = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
          <Contacts/>
          
          <Footer />
        </div>
      </div>
    </div>
  );

  
  export default ContactUs;
  
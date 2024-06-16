import styles from "../style";
import {  Footer, Navbar, About } from "../components";
const AboutUs = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
          <About/>
          
          <Footer />
        </div>
      </div>
    </div>
  );

  
  export default AboutUs;
  
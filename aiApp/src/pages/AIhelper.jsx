import styles from "../style";
import {  Footer, Navbar , Gpt } from "../components";
const AIhelper = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Gpt />
          <Footer />
        </div>
      </div>
    </div>
  );

  
  export default AIhelper;
  
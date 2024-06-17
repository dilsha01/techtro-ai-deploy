import styles from "../style";
import {  Reset, Footer, Navbar   } from "../components";
const Reseting = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
          <Reset/>
         
          <Footer />
        </div>
      </div>
    </div>
  );

  
  export default Reseting;
  
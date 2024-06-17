import styles from "../style";
import {  ResetLayer, Footer, Navbar   } from "../components";
const ResetingLayer = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
          <ResetLayer/>
         
          <Footer />
        </div>
      </div>
    </div>
  );

  
  export default ResetingLayer;
  
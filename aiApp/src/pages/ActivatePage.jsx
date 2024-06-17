import styles from "../style";
import {  Activate  } from "../components";
const Activating = () => (
    <div className="bg-primary w-full overflow-hidden">  
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
          <Activate/>
        </div>
      </div>
    </div>
  );

  
  export default Activating;
  
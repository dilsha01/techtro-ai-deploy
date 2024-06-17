import styles from "../style";
import {  SignIn, Footer, Navbar   } from "../components";
const Signin = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
          <SignIn/>
         
          <Footer />
        </div>
      </div>
    </div>
  );

  
  export default Signin;
  
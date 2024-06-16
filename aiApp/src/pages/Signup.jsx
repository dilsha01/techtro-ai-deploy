import styles from "../style";
import {  Footer, Navbar, SignUp } from "../components";
const Signup = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      
      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
          <SignUp/>
         
          <Footer />
        </div>
      </div>
    </div>
  );

  
  export default Signup;
  
import React from 'react'


const FogotPassword = () => {
    const {  isLoggedIn } = useContext(AuthContext); 
    const res = await axios.post("/api/auth/forgot-password", 
       
        email
        
      );



export default FogotPassword

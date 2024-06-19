import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import {  AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";

import Home from "./pages/home";
import Products from "./pages/products";
import ComingSoon from "./pages/ComingSoon";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AIhelper from "./pages/AIhelper";
import Reseting from "./pages/Reseting";
import ResetingLayer from "./pages/ResetingLayer";
import Activating from "./pages/ActivatePage";



export default function App(){

  const {dispatch,token,isLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    const _appsigning = localStorage.getItem("_appsigning");   
    if(_appsigning){
      const getToken = async () => {
        const res = await axios.post("/api/auth/access", null);
        dispatch({type:"GET_TOKEN",payload:res.data.ac_token});
      } 
      getToken();
    }
  },[dispatch ,  isLoggedIn]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("/api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token]);



  return <BrowserRouter>
  <Routes>
    <Route path = "/" element ={<Home />}/>
    <Route path = "/home" element ={<Home />}/>
    <Route path = "/products" element ={<Products />}/>
    <Route path = "/about" element ={<AboutUs />}/>
    <Route path = "/contact-us" element ={<ContactUs />}/>
    <Route path = "/sign-in" element ={<Signin />}/>
    <Route path = "/sign-up" element ={<Signup />}/>

    <Route path = "/forgot-password/" element ={<Reseting />}/>
    <Route path = "/reset-password/:token" element ={<ResetingLayer />}/>
    <Route path = "/activate/:token" element ={<Activating />}/>

    <Route path = "/profile" element ={<ComingSoon />}/>
    <Route path = "/update" element ={< ComingSoon/>}/>
    
    <Route path = "/helper" element ={isLoggedIn ? <AIhelper /> :<Signin />}/>
    <Route path = "/aimage-generator" element ={isLoggedIn ? <ComingSoon /> :<Signin/>}/>
    <Route path = "/financial-assistant" element ={isLoggedIn ? <ComingSoon /> :<Signin />}/>
    
    <Route path = "/content" element ={isLoggedIn ? <ComingSoon /> :<Home />}/>

    <Route path = "/create" element ={<ComingSoon />}/>
    <Route path = "/explore" element ={<ComingSoon />}/>
    <Route path = "/terms-and-services" element ={<ComingSoon />}/>
    <Route path = "/help-center" element ={<ComingSoon />}/>
    <Route path = "/partners" element ={<ComingSoon />}/>
    <Route path = "/suggestions" element ={<ComingSoon />}/>
    <Route path = "/blog" element ={<ComingSoon />}/>
    <Route path = "/full-time" element ={<ComingSoon />}/>
    <Route path = "/part-time" element ={<ComingSoon />}/>
    
    

  </Routes>
  </BrowserRouter>
}
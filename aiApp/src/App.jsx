import {BrowserRouter,Route,Routes} from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import ComingSoon from "./pages/ComingSoon";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

export default function App(){
  return <BrowserRouter>
  <Routes>
    <Route path = "/" element ={<Home />}/>
    <Route path = "/home" element ={<Home />}/>
    <Route path = "/products" element ={<Products />}/>
    <Route path = "/about" element ={<AboutUs />}/>
    <Route path = "/contact-us" element ={<ContactUs />}/>
    <Route path = "/sign-in" element ={<ComingSoon />}/>
    <Route path = "/sign-up" element ={<ComingSoon />}/>
    
    <Route path = "/helper" element ={<ComingSoon />}/>
    <Route path = "/aimage-generator" element ={<ComingSoon />}/>
    <Route path = "/financial-assistant" element ={<ComingSoon />}/>
    
    <Route path = "/content" element ={<ComingSoon />}/>
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
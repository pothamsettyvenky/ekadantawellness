import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Pages/Home/Home";

import SplashScreen from "./components/SplashScreen/SplashScreen";
import AboutClinic from "./Pages/AboutClinic/AboutClinic";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./Pages/footer/footer"
import Doctor from "./Pages/Doctor/Doctor";
import PatientsCorner from "./Pages/PatientsCorner/PatientsCorner";
function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 5000);

    return () => clearTimeout(timer);

  }, []);

  return (

    <>
      {
        loading
        ?
        <SplashScreen />
        :
        <BrowserRouter>
<Navbar/>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about/clinic" element={<AboutClinic/>} />
            <Route path = "/about/doctor" element = {<Doctor/>}/>
            <Route path = "/patientscorner/faq" element= {<PatientsCorner/>}/> 
          </Routes>
<Footer/>
        </BrowserRouter>
        
      }
      
    </>

  );
}

export default App;
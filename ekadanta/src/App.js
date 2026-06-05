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
import Treatments from "./Pages/Treatments/Treatments";
import ScrollToTop from "./ScrollToTop";
import TestimonialsPage from "./Pages/TestimonialsPage/TestimonialsPage";
import BookAppointment from "./Pages/BookAppointment/BookAppointment";

// admin page
import Dashboard from "./Admin/Dashboard/Dashboard";
import Appointments from "./Admin/Appointments/Appointments";
import Slots from "./Admin/Slots/Slots";
import Patients from "./Admin/Patients/Patients";
import PatientDetails from "./Admin/PatientDetails/PatientDetails"
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
         <ScrollToTop/>
<Navbar/>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about/clinic" element={<AboutClinic/>} />
            <Route path = "/about/doctor" element = {<Doctor/>}/>
            <Route path = "/patientscorner/faq" element= {<PatientsCorner/>}/> 
            <Route path = "/treatments" element = {<Treatments/>}/>
            <Route path = "/patientscorner/testimonials" element = {<TestimonialsPage/>}/>
            <Route path = "/book_appointment" element = {<BookAppointment/>}/>


            {/* admin page */}
            <Route path = "/admin/appointment" element = {<Appointments/>}/>
            <Route path = "/admin/dashboard" element = {<Dashboard/>}/>
            <Route path = "/admin/slots" element ={<Slots/>}/>
            <Route path = "/admin/patients" element = {<Patients/>}/>
            <Route
  path="/admin/patient/:id"
  element={<PatientDetails />}
/>
          </Routes>
<Footer/>
        </BrowserRouter>
        
      }
      
    </>

  );
}

export default App;
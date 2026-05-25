import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./Pages/Home/Home";

import SplashScreen from "./components/SplashScreen/SplashScreen";

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

          <Routes>

            <Route path="/" element={<Home />} />

          </Routes>

        </BrowserRouter>
      }
    </>

  );
}

export default App;
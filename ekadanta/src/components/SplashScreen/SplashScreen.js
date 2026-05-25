import React from "react";
import "./SplashScreen.css";

function SplashScreen() {

  return (

    <div className="splash-screen">

      <div className="splash-content">

        {/* Logo */}

        <img
          src={require("../../assets/images/logo.png")}
          alt="Ekadantha Wellness"
          className="splash-logo"
        />

        {/* Text */}

        <h1>
          Welcome to
          <br />
          Ekadantha Wellness
        </h1>

      </div>

    </div>
  );
}

export default SplashScreen;
import React from "react";
import "./SplashScreen.css";

function SplashScreen() {

  return (

    <div className="splash-screen">

      <div className="splash-content">

        {/* Video */}

        <video
          autoPlay
          muted
          playsInline
          className="splash-video"
        >

          <source
            src={require("../../assets/images/splash.mp4")}
            type="video/mp4"
          />

        </video>

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
import { useState } from "react";
import logo from "../../../assets/company-logo.svg";
import "./Login.css";
import LoginHome from "./LoginHome/LoginHome";
import LoginSignIn from "./LoginSignIn/LoginSignIn";
import LoginSignUp from "./LoginSignUp/LoginSignUp";

const Login = () => {
  // ------------state--for--sign-------------
  const [trueSignin, setTrueSignIn] = useState(true);
  const [trueSignup, setTrueSignUp] = useState(true);

  const setDisable = trueSignin && trueSignup;

  return (
    <div className="login">
      <img alt="company-logo" className="company-logo" src={logo}></img>

      <LoginHome
        setTrueSignIn={setTrueSignIn}
        setTrueSignUp={setTrueSignUp}
        setDisable={setDisable}
      />

      <LoginSignIn trueSignin={trueSignin} setTrueSignIn={setTrueSignIn} />

      <LoginSignUp trueSignup={trueSignup} setTrueSignUp={setTrueSignUp} />
    </div>
  );
};

export default Login;

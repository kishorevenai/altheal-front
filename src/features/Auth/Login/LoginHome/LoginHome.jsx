import React from "react";
import "./LoginHome.css";

const LoginHome = ({ setTrueSignIn, setTrueSignUp, setDisable }) => {
  const HandleShowSignIn = () => {
    setTrueSignIn((prev) => !prev);
  };

  const HandleShowSignUp = () => {
    setTrueSignUp((prev) => !prev);
  };
  return (
    <div className="sign_buttons">
      <button
        className="login_btn login_page-button"
        disabled={!setDisable}
        onClick={HandleShowSignIn}
      >
        Sign In
      </button>
      <div className="l_or_l">
        <div className="line"></div>
        <div>or</div>
        <div className="line"></div>
      </div>
      <button
        onClick={HandleShowSignUp}
        className="login_btn login-page-button"
        disabled={!setDisable}
      >
        Sign Up
      </button>
    </div>
  );
};

export default LoginHome;

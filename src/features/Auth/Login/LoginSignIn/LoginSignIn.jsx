import React, { useEffect, useRef, useState } from "react";
import "./LoginSignIn.css";
import { useLoginMutation } from "../../authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../authSlice";
import { useNavigate } from "react-router-dom";

const LoginSignIn = ({ trueSignin, setTrueSignIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errRef = useRef();
  const userRef = useRef();

  //   ---------------------states----------------------

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  //   ------------------useEffect---------------------
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  //   --------------------slices----------------------

  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();
  //   -----------------------Boolean-------------------

  const setDataCredentials =
    [email, password].every(Boolean) && !isLoginLoading;

  const errorClass = errMsg ? "errmsg" : "errmsg offscreen";

  // ---------------------functions--------------------

  const HandleShowSignIn = () => {
    setTrueSignIn((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        email,
        password,
        partyRoleNm: "Member",
      });

      const { token } = data;

      dispatch(setCredentials({ token }));
      navigate("/dash");
    } catch (error) {
      if (loginError?.status === 404) {
        setErrMsg("invalid credentials");
      } else if (error.status === 400) {
        setErrMsg("Missing username and password");
      } else if (error.status === 404) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg(error?.data?.message);
      }
      errRef.current.focus();
    }
  };

  if (isLoginLoading) {
    return <div className="loader"></div>;
  }

  return (
    <form
      onSubmit={handleLogin}
      className={trueSignin ? "signin effect" : "signin"}
    >
      <p className={errorClass} ref={errRef} aria-label="assertive">
        {errMsg}
      </p>
      <div onClick={HandleShowSignIn} className="x_btn"></div>
      <h2>Sign In</h2>
      <div className="signin_inputs">
        <input
          ref={userRef}
          placeholder="Username or email"
          className="login_inputs"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        ></input>
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="login_inputs"
          type="password"
        ></input>
        <p>Forgot password?</p>
      </div>
      <button
        className="login_btn"
        type="submit"
        disabled={!setDataCredentials}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginSignIn;

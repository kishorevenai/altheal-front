import { useLoginMutation, useSignInMutation } from "../authApiSlice";
import { setCredentials } from "../authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { usePersist } from "../../../hooks/usePersist";
import logo from "../../../assets/company-logo.svg";

import "./Login.css";
import WowChart from "../WowChart";
import { roles } from "../../../config/roles";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: isLoginLoading, isError, error }] =
    useLoginMutation();
  const [
    signIn,
    { isLoading: isSignUpLoading, isError: isSignupError, error: signupErrro },
  ] = useSignInMutation();
  const [persist, setPersist] = usePersist();

  // ----------------------login credentials----------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // -------------------------------------------------------------------

  // ------------------------Sign up credentials------------------------
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignUpEmail] = useState("");
  const [signupPassword, setSignUpPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [role, setRoles] = useState([]);

  const [errMsg, setErrMsg] = useState(null);

  const firstnameRef = useRef();
  const userRef = useRef();
  const errRef = useRef();
  // ------------state--for--sign-------------
  const [trueSignin, setTrueSignIn] = useState(true);
  const [trueSignup, setTrueSignUp] = useState(true);

  const setDisable = trueSignin && trueSignup;

  // ---------------------required--inputs----------------------

  const setDataCredentials =
    [email, password].every(Boolean) && !isLoginLoading;

  const setSignUpDataCredentials =
    [signupEmail, signupPassword, firstname, lastname, password].every(
      Boolean
    ) && !isSignUpLoading;

  const errorClass = errMsg ? "errmsg" : "errmsg offscreen";

  const handleSelectedRole = (e) => {
    if (!role.includes(e.target.value)) {
      setRoles((prev) => [...prev, e.target.value]);
    } else {
      const filter = role.filter((prev) => prev != e.target.value);
      setRoles(filter);
    }
  };

  const RolesChoose = roles.map((innerRole) => {
    let activeClassName = false;
    if (role.includes(innerRole)) {
      activeClassName = true;
    }
    return (
      <button
        className={activeClassName ? "role_btn active" : "role_btn"}
        key={innerRole}
        onClick={handleSelectedRole}
        value={innerRole}
      >
        {innerRole}
      </button>
    );
  });

  useEffect(() => {
    firstnameRef.current.focus();
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, firstname, lastname, phonenumber]);

  const HandleShowSignIn = () => {
    setTrueSignIn((prev) => !prev);
  };

  const HandleShowSignUp = () => {
    setTrueSignUp((prev) => !prev);
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
      if (!error.status) {
        setErrMsg("No server response");
      } else if (error.status === 400) {
        setErrMsg("Missing username and password");
      } else if (error.status === 404) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg(error?.data?.message);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn({
        firstname,
        lastname,
        email: signupEmail,
        password: signupPassword,
        phonenumber,
        role,
      });

      console.log(result);
    } catch (error) {
      if (!error.statue) {
        setErrMsg("No server response");
      } else if (error.statue === 400) {
        setErrMsg("Missing username and password");
      } else if (error.statue === 404) {
        setErrMsg("Unauthorised");
      } else {
        setErrMsg(error?.data?.message);
      }
    }
  };

  if (isLoginLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="login">
      <img alt="company-logo" className="company-logo" src={logo}></img>
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

      <form
        onSubmit={handleSignUp}
        className={trueSignup ? "signup effect" : "signup"}
      >
        <h2>Sign Up</h2>
        <p className={errorClass} ref={errRef} aria-label="assertive">
          {errMsg}
        </p>
        <div className="f_name_l">
          <input
            ref={firstnameRef}
            className="login_inputs_medium"
            placeholder="First name"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          ></input>
          <input
            className="login_inputs_medium"
            placeholder="Last name"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          ></input>
        </div>
        <input
          className="login_inputs"
          placeholder="Email"
          type="email"
          onChange={(e) => setSignUpEmail(e.target.value)}
        ></input>
        <input
          className="login_inputs"
          type="password"
          placeholder="Password"
          onChange={(e) => setSignUpPassword(e.target.value)}
        ></input>
        <div className="phoneno_inputs">
          <div onClick={HandleShowSignUp} className="x_btn"></div>
          <select className="country_code">
            <option>IND</option>
            <option>US</option>
          </select>
          <input
            className="phonenumber"
            placeholder="Number"
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
        </div>
        <div className="roles_select">{RolesChoose}</div>
        <button type="submit" className="login_btn">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;

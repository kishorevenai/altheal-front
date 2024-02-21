import { useGetCountryCodeQuery, useSignInMutation } from "../authApiSlice";
import { setCredentials } from "../authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/company-logo.svg";
import "./Login.css";
import { roles } from "../../../config/roles";
import LoginHome from "./LoginHome/LoginHome";
import LoginSignUp from "./LoginSignUp/LoginSignUp";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: countryCodeData, isSuccess: isCountryCodeSuccess } =
    useGetCountryCodeQuery();

  const [
    signIn,
    { isLoading: isSignUpLoading, isError: isSignupError, error: signupErrro },
  ] = useSignInMutation();
  // const [persist, setPersist] = usePersist();

  // ------------------------Sign up credentials------------------------
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignUpEmail] = useState("");
  const [signupPassword, setSignUpPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [onCountryCode, setOnCountryCode] = useState("");
  const [role, setRoles] = useState([]);

  const firstnameRef = useRef();
  const userRef = useRef();
  // ------------state--for--sign-------------
  const [trueSignin, setTrueSignIn] = useState(true);
  const [trueSignup, setTrueSignUp] = useState(true);

  const setDisable = trueSignin && trueSignup;

  // ---------------------required--inputs----------------------

  // const setSignUpDataCredentials =
  //   [signupEmail, signupPassword, firstname, lastname, password].every(
  //     Boolean
  //   ) && !isSignUpLoading;


  const handleSelectedRole = (e) => {
    const selectedRole = e.target.value;
    if (!role.includes(selectedRole)) {
      // Add the role to the array if it's not already present
      setRoles((prevRoles) => [...prevRoles, selectedRole]);
    } else {
      // Remove the role from the array if it's already present
      setRoles((prevRoles) =>
        prevRoles.filter((role) => role !== selectedRole)
      );
    }
  };

  let countryCodeNumber = null;

  if (isCountryCodeSuccess) {
    countryCodeNumber = countryCodeData.map((countryCode, index) => {
      return (
        <option key={index} value={countryCode.mobileCode}>
          {countryCode.countryShortCode}-{countryCode.mobileCode}
        </option>
      );
    });
  }

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
        type="button"
      >
        {innerRole}
      </button>
    );
  });


  // useEffect(() => {
  //   setErrMsg("");
  // }, [email, password, firstname, lastname, phonenumber]);

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

      console.log(data);

      const { token } = data;

      dispatch(setCredentials({ token }));
      navigate("/dash");
    } catch (error) {
      console.log(loginError);
      if (loginError?.status === 404) {
        setErrMsg("invalid credentials");
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
        firstName: firstname,
        lastName: lastname,
        email: signupEmail,
        password: signupPassword,
        mobileNumber: phonenumber,
        partyRoleNm: "Member",
        admCountryId: onCountryCode,
      });

      dispatch(setCredentials(result.data));

      navigate("/dash");
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


  return (
    <div className="login">
      <img alt="company-logo" className="company-logo" src={logo}></img>
      {/* <div className="sign_buttons">
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
      </div> */}
      <LoginHome
        setTrueSignIn={setTrueSignIn}
        setTrueSignUp={setTrueSignUp}
        setDisable={setDisable}
      />

      {/* <form
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
      </form> */}

      <LoginSignUp trueSignin={trueSignin} setTrueSignIn={setTrueSignIn} />

      <form
        onSubmit={handleSignUp}
        className={trueSignup ? "signup effect" : "signup"}
      >
        <h2>Sign Up</h2>
        {/* <p className={errorClass} ref={errRef} aria-label="assertive">
          {errMsg}
        </p> */}
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
          <select
            className="country_code"
            onChange={(e) => setOnCountryCode(e.target.value)}
          >
            <option value=" "></option>
            {countryCodeNumber}
          </select>
          <input
            className="phonenumber"
            placeholder="Number"
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
        </div>
        <div className="roles_select">{RolesChoose}</div>
        <button className="login_btn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;

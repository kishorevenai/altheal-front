import "./LoginSignUp.css";
import { useSignInMutation, useGetCountryCodeQuery } from "../../authApiSlice";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roles } from "../../../../config/roles";

const LoginSignUp = ({ trueSignup, setTrueSignUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   ---------------states-------------------

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [signupEmail, setSignUpEmail] = useState("");
  const [signupPassword, setSignUpPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [onCountryCode, setOnCountryCode] = useState("");
  const [role, setRoles] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  //   ---------------refs-----------------------

  const firstnameRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  const errorClass = errMsg ? "errmsg" : "errmsg offscreen";
  // ------------------slices----------------------
  const [
    signIn,
    { isLoading: isSignUpLoading, isError: isSignupError, error: signupErrro },
  ] = useSignInMutation();

  const { data: countryCodeData, isSuccess: isCountryCodeSuccess } =
    useGetCountryCodeQuery();

  // ------------------functions-----------------------

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

  const HandleShowSignUp = () => {
    setTrueSignUp((prev) => !prev);
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

  // -------------------inner-components---------------------

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

  return (
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
  );
};

export default LoginSignUp;

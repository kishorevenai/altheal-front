import React from "react";
import "./DashMenuMobile.css";
import companyLogo from "../../../assets/company-logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../features/Auth/authSlice";

import logoutArrow from "../../../assets/logout-arrow.svg";

const DashMenuMobile = ({ trueHam, setTrueHam }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuOptions = [
    "Dashboard",
    "Documentation",
    "Wheel of Wellness",
    "Questionnaires",
    "My Community",
  ];

  const DashMenuOptions = menuOptions.map((option) => {
    return (
      <button key={option} className="dash_menu_btn">
        {option}
      </button>
    );
  });

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className={trueHam ? "dash_option_mob" : "dash_option_mob active"}>
      <img src={companyLogo} className="company-logo" alt="company-logo"></img>
      <div className="dashOptions">{DashMenuOptions}</div>
      <div className="logout_button">
        <img
          className="logout-arrow"
          alt="logout-arrow"
          src={logoutArrow}
        ></img>
        <button onClick={handleLogOut} className="log_out_btn">
          Log out
        </button>
      </div>
    </div>
  );
};
export default DashMenuMobile;

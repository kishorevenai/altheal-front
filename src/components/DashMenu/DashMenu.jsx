import Logo from "../../assets/company-logo.svg";
import "./DashMenu.css";
import logoutArrow from "../../assets/logout-arrow.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/Auth/authSlice";

const DashMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();





  const handleLogOut = () => {
    dispatch(logOut())
   navigate('/') 
  }

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

  return (
    <div className="dash_menu">
      <div className="logo-with-btns">
        <img className="logo" alt="company_logo" src={Logo}></img>
        <div className="dashOptions">{DashMenuOptions}</div>
      </div>
      <div className="logout_button">
        <img
          className="logout-arrow"
          alt="logout-arrow"
          src={logoutArrow}
        ></img>
        <button onClick={handleLogOut} className="log_out_btn">Log out</button>
      </div>
    </div>
  );
};

export default DashMenu;

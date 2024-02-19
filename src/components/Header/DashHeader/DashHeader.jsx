import "./DashHeader.css";
import home_logo from "../../../assets/home_icon.svg";
import brdcrmbarrow from "../../../assets/brd_crmb_logo.svg";
import profileIcon from "../../../assets/profile.svg";
import notificationLogo from "../../../assets/notification.svg";

export const DashHeader = () => {
  return (
    <div className="dash_header">
      <div className="home_bread_crumb">
        <img alt="home_icon" src={home_logo} className="home_icn"></img>
        <div className="bread_crumb_options">
          <img
            style={{ width: "20px" }}
            alt="bread_crumb_arrow"
            src={brdcrmbarrow}
          ></img>
          <p className="dash_board">Dashboard</p>
        </div>
      </div>
      <div className="role_profile_alerts">
        <p>Member</p>
        <img
          className="profile_icon"
          src={profileIcon}
          alt="profile_icon"
        ></img>
        <img
          className="notification"
          src={notificationLogo}
          alt="notification"
        ></img>
      </div>
    </div>
  );
};

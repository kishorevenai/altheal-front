import "./DashHeader.css";
import home_logo from "../../../assets/home_icon.svg";
import brdcrmbarrow from "../../../assets/brd_crmb_logo.svg";

export const DashHeader = () => {
  return (
    <div className="dash_header">
      <div className="home_bread_crumb">
        <img alt="home_icon" src={home_logo} className="home_icn"></img>
        <div className="bread_crumb_options">
          <img alt="bread_crumb_arrow" src={brdcrmbarrow}></img>
          <p>Dashboard</p>
        </div>
      </div>
    </div>
  );
};

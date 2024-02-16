import "./Header.css";
import Logo from "../../assets/company-logo.svg";

const Header = () => {
  return <div className="header">
    <img src={Logo}></img>
  </div>;
};

export default Header;

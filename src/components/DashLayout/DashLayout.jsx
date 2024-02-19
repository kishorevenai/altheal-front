import { Outlet } from "react-router-dom";
import "./DashLayout.css";
import DashFooter from "../DashFooter";
import { DashHeader } from "../Header/DashHeader/DashHeader";
import DashMenu from "../DashMenu/DashMenu";

const DashLayout = () => {
  return (
    <div className="App">
      <div className="top_part">
        <DashMenu />
        <div className="middle_content">
          <DashHeader />
          <Outlet />
        </div>
      </div>
      <DashFooter />
    </div>
  );
};

export default DashLayout;

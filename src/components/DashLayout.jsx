import { Outlet } from "react-router-dom";

import DashFooter from "./DashFooter";
import { DashHeader } from "./Header/DashHeader/DashHeader";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="App">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;

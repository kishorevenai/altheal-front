import { Outlet } from "react-router-dom";
import { DashHeader } from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default DashLayout;

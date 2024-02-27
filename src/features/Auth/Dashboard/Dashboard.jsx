import React from "react";
import GraphComp from "./GraphComp/GraphComp";
import Calender from "./Calender/Calender";
import Products from "./Products/Products";
import "./Dashboard.css";
import Network from "./Network/Network";
import Meeting from "./Meeting/Meeting";
import Messages from "./Messages/Messages";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dash-part-one">
        <p className="welcome-p">Welcome</p>
        <div className="graph-calender">
          <GraphComp />
          <Calender />
        </div>
        <Products />
      </div>
      <div className="dash-part-two">
        <Network />
        <Meeting/>
        <Messages/>
      </div>
    </div>
  );
};

export default Dashboard;

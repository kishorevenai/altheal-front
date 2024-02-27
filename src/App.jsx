import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/Auth/Login/Login";
// import RequestAuth from "./hooks/RequestAuth";
import DashLayout from "./components/DashLayout/DashLayout";
import PrefetchCntyCode from "./features/Auth/PrefetchCntyCode";
import Dashboard from "./features/Auth/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PrefetchCntyCode/>}>
          <Route index element={<Login />} />
        </Route>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Dashboard/>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

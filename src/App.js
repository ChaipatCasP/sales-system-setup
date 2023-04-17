import "./App.css";
import React, { useEffect, useState } from "react";
import PageStaff from "./components/PageStaff/PageStaff";
import HeaderTopBar from "./components/HeaderTopBar/HeaderTopBar";
import PageCustomer from "./components/PageCustomer/PageCustomer";
import { Navigate, useRoutes } from "react-router-dom";
import PageLogin from "./components/PageLogin/PageLogin";
import VisitationReportByCustomer from "./components/VisitationReportByCustomer/VisitationReportByCustomer";

function App() {
  const P_USER = localStorage.getItem("P_USER");
  const [P_YEAR, setP_YEAR] = useState(localStorage.getItem("P_YEAR"));


  let router = useRoutes([
    { path: "/", element: <PageLogin /> },
    {
      path: "/PageLogin",
      element: <PageLogin />,
    },
    {
      path: "/PageStaff",
      element: <PageStaff P_YEAR={P_YEAR} />,
    },
    {
      path: "/VisitationReportByCustomer",
      element: <VisitationReportByCustomer P_YEAR={P_YEAR}/>
    },
    {
      path: "/PageCustomer",
      element: <PageCustomer P_YEAR={P_YEAR} />,
    },
    { path: "*", element: <Navigate to={"/"} /> },
  ]);

  function onYearChange(value) {
    localStorage.setItem("P_YEAR", value);
    setP_YEAR(value);
  }

  return (
    <>
      {/* <div className="app">
        <HeaderTopBar />
        <PageCustomer/>
        <section className="app-container"></section>
        <PageStaff />
      </div> */}

      <HeaderTopBar onYearChange={onYearChange} P_USER={P_USER} />
      {router}
      {/* <Routes>
        <Route path="/" element={<PageStaff />} />
        <Route path="PageStaff" element={<PageStaff />} />
        <Route path="PageCustomer" element={<PageCustomer />} />
      </Routes> */}
    </>
  );
}

export default App;

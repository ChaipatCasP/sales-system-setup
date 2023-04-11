import "./App.css";
import React, { useEffect, useState } from "react";
import PageStaff from "./components/PageStaff/PageStaff";
import HeaderTopBar from "./components/HeaderTopBar/HeaderTopBar";
import PageCustomer from "./components/PageCustomer/PageCustomer";
// import { Routes, Route } from "react-router-dom";
import { Navigate, useRoutes } from "react-router-dom";
import PageLogin from "./components/PageLogin/PageLogin";

function App() {
  const [P_YEAR, setP_YEAR] = useState("2022");
  const [P_USER, setP_USER] = useState("");
  const [P_MONTH, setP_MONTH] = useState("");

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
      path: "/PageCustomer",
      element: <PageCustomer P_YEAR={P_YEAR} />,
    },
    { path: "*", element: <Navigate to={"/"} /> },
  ]);

  function onYearChange(value) {
    setP_YEAR(value);
    localStorage.setItem("P_YEAR", value);
  }

  function onMonthChange(value) {
    setP_MONTH(value);
  }

  useEffect(() => {
    setP_USER(localStorage.getItem("P_USER"));
  }, []);

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

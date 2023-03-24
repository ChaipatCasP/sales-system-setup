import "./App.css";
import { Navigate, useRoutes } from "react-router-dom";
import Products from "./components/Products/Products";
import StaffInformation from "./components/Infomation/StaffInformation";
import productslist from "./Data";
import Services from "./components/Shared/services/Services";
import StaffList from "./components/Stafflist/Stafflist";
import Datalist from "./components/Datalist/Datalist";
import React, { useEffect, useState } from "react";

function App() {
  const [SelStaffCode, setSelStaffCode] = useState("");
  const [SelYear, setSelYear] = useState("");

  useEffect(() => {
    setSelYear('2022');
    setSelStaffCode('F2304');
  }, []);

  function onStaffClick(value) {
    setSelStaffCode(value);
    // alert("onStaffClick : " + value);
  }

  function onYearChange(value) {
    setSelYear(value);
    // alert("onYearChange : " + value);
  }


  const PlannedElements = productslist.map((product, index) => {
    return (
      <Datalist
        key={index}
        product={product}
        P_YEAR={SelYear}
        P_USER={SelStaffCode}
      />
    );
  });

  return (
    <div className="app">
      <div className="app-header">
        <header className=" header">
          <select
            className="dropdown-year"
            onChange={(event) => onYearChange(event.target.value)}
          >
            <option className="dropdown-option" value={2019}>
              2019
            </option>
            <option className="dropdown-option" value={2020}>
              2020
            </option>
            <option className="dropdown-option" value={2021}>
              2021
            </option>
            <option className="dropdown-option" value={2022} selected>
              2022
            </option>
            <option className="dropdown-option" value={2023} >
              2023
            </option>
          </select>

          {/* <nav className="nav"></nav> */}
        </header>
      </div>
      <section className="app-section"></section>
      <section className="app-container"></section>
      <input value={SelStaffCode} />
      <input value={SelYear} />

      <div className="app-content">
        <div className="app-content-main">
          <StaffList onClick={onStaffClick} P_YEAR={SelYear} />
        </div>

        <div className="app-content-box">
          <div className="app-content-box-item">{PlannedElements}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

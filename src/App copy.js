import "./App.css";
import productslist from "./Data";
import StaffList from "./components/Stafflist/Stafflist";
import Datalist from "./components/Datalist/Datalist";
import React, { useEffect, useState } from "react";

function App() {
  const [p_user, setP_user] = useState("F2304");
  const [searchText, setSearchText] = useState("");

  const [SelStaffCode, setSelStaffCode] = useState("");
  const [SelYear, setSelYear] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  }, []);

  function onStaffClick(value) {
    setSelStaffCode(value);
  }

  function onYearChange(value) {
    setSelYear(value);
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
      <div className="topbar">
        <span className="name">
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
            <option className="dropdown-option" value={2022}>
              2022
            </option>
            <option className="dropdown-option" value={2023}>
              2023
            </option>
          </select>
        </span>
        {/* <span className="code">Code</span> */}
        {/* <button className="circle-button"></button> */}
        <span className="code">
          <label>{p_user}</label>
          <br />
          <label>Manager Name</label>
        </span>
      </div>

      {/* <section className="app-section"></section> */}
      <section className="app-container"></section>
      {/* <input value={SelStaffCode} />
      <input value={SelYear} /> */}

      <div className="app-content">
        <div className="app-content-main">
          <div className="app-content-main-Search">
            <input className="" type="text" placeholder="Search Staff Code" onChange={(event) => setSearchText(event.target.value)}/>
            
            <label>{searchText}</label>
          </div>

          <StaffList onClick={onStaffClick} P_YEAR={SelYear} P_USER={p_user} />
        </div>

        <div className="app-content-box">
           <div className="app-content-box-item">{PlannedElements}</div> 
        </div>
      </div>
    </div>
  );
}

export default App;

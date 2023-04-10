import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function HeaderTopBar(props) {
  const { onYearChange } = props;
  const P_USER = localStorage.getItem("P_USER");
  const location = useLocation();

  // let message;
  // if (location.pathname === "/PageCustomer") {
  //   message = (
  //     <select
  //       className="dropdown-year"
  //       onChange={(event) => onMonthChange(event.target.value)}
  //     >
  //       <option className="dropdown-option" value={""}>
          
  //       </option>
  //       <option className="dropdown-option" value={"JAN"}>
  //         JAN
  //       </option>
  //       <option className="dropdown-option" value={"FEB"}>
  //         FEB
  //       </option>
  //       <option className="dropdown-option" value={"MAR"}>
  //         MAR
  //       </option>
  //       <option className="dropdown-option" value={"APR"}>
  //         APR
  //       </option>
  //       <option className="dropdown-option" value={"MAY"}>
  //         MAY
  //       </option>
  //       <option className="dropdown-option" value={"JUN"}>
  //         JUN
  //       </option>
  //       <option className="dropdown-option" value={"JUL"}>
  //         JUL
  //       </option>
  //       <option className="dropdown-option" value={"AUG"}>
  //         AUG
  //       </option>
  //       <option className="dropdown-option" value={"SEP"}>
  //         SEP
  //       </option>
  //       <option className="dropdown-option" value={"OCT"}>
  //         OCT
  //       </option>
  //       <option className="dropdown-option" value={"NOV"}>
  //         NOV
  //       </option>
  //       <option className="dropdown-option" value={"DEC"}>
  //         DEC
  //       </option>
  //     </select>
  //   );
  // }
  return (
    <>
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
            <option className="dropdown-option" value={2022} selected>
              2022
            </option>
            <option className="dropdown-option" value={2023}>
              2023
            </option>
          </select>
        </span>

        <span className="code">
          <label>{P_USER}</label>
          <br />
          <label>Manager Name </label>
          {/* {location.pathname} */}
        </span>
      </div>
    </>
  );
}

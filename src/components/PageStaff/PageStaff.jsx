import React, { useEffect, useState } from "react";
import StaffList from "../Stafflist/Stafflist";
import Datalist from "../Datalist/Datalist";

export default function PageStaff(prors) {
  const { P_YEAR} = prors;
  const [P_USER, setP_USER] = useState("F2304");

  const [searchText, setSearchText] = useState("");
  const [StaffCode, setStaffCode] = useState("");

  function onStaffClick(value) {
    setStaffCode(value);
  }

  return (
    <>
      <h1>P_YEAR: {P_YEAR}</h1>
      <div className="app-content">
        <div className="app-content-main">
          <div className="app-content-main-Search">
            <input
              className=""
              type="text"
              placeholder="Search Staff Code"
              onChange={(event) => setSearchText(event.target.value)}
            />

            <label>{searchText}</label>
          </div>

          <StaffList onClick={onStaffClick} P_YEAR={P_YEAR} P_USER={P_USER} />
        </div>

        <div className="app-content-box">
          {/* <div className="app-content-box-item">{PlannedElements}</div>  */}

          <div className="app-content-box-item">
            <Datalist P_YEAR={P_YEAR} STAFFCODE={StaffCode}/>
          </div>
        </div>
      </div>
    </>
  );
}

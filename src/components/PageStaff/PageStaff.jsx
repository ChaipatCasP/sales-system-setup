import React, { useEffect, useState } from "react";
import StaffList from "../Stafflist/Stafflist";
import Datalist from "../Datalist/Datalist";
import { useNavigate } from "react-router-dom";

export default function PageStaff(prors) {
  const navigate = useNavigate();
  const { P_YEAR } = prors;

  const [searchText, setSearchText] = useState("");
  const [StaffCode, setStaffCode] = useState("");

  function onStaffClick(value) {
    setStaffCode(value);
    localStorage.setItem("STAFFCODE", value);
    document.getElementById("datalist").style.display = "";
  }

  function onChangeSearch(value){
    document.getElementById("datalist").style.display = "none";
    setSearchText(value);
  }

  useEffect(() => {
    const P_USER = localStorage.getItem("P_USER");
    if (P_USER === "") {
      navigate("/PageLogin");
    }
  }, []);

  return (
    <>
      <div className="app-content">
        <div className="app-content-main">
          <div className="app-content-main-Search">
            <input
              className=""
              type="text"
              placeholder="Search Staff Code"
              onChange={(event) => onChangeSearch(event.target.value)}
            />
          </div>

          <StaffList
            onClick={onStaffClick}
            P_YEAR={P_YEAR}
            searchText={searchText}
          />
        </div>

        <div className="app-content-box">
          {/* <div className="app-content-box-item">{PlannedElements}</div>  */}

          <div className="app-content-box-item" id="datalist">
            <Datalist P_YEAR={P_YEAR} STAFFCODE={StaffCode} />
          </div>
        </div>
      </div>
    </>
  );
}

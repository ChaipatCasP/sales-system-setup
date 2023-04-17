import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "./CustomerList/CustomerList";
import Detailslist from "./Detailslist/Detailslist";

export default function VisitationReportByCustomer(props) {
  const { P_YEAR } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const P_USER = localStorage.getItem("P_USER");
    if (P_USER === "") {
      navigate("/PageLogin");
    }
  });

  const [searchText, setSearchText] = useState("");
  function onChangeSearch(value) {
    // document.getElementById("datalist").style.display = "none";
    setSearchText(value);
  }

  const [customerCode, SetCustomerCode] = useState("");
  function onClickCustomer(value){
    SetCustomerCode(value);
  }

  return (
    <>
      <div className="app-content">
        <div className="app-content-main">
          <div className="app-content-main-Search">
            <input
              className=""
              type="text"
              placeholder="Search Customer Code"
              onChange={(event) => onChangeSearch(event.target.value)}
            />
          </div>
          <CustomerList onClick={onClickCustomer}P_YEAR={P_YEAR} searchText={searchText} />
        </div>

        <div className="app-content-box">
          <div className="app-content-box-item" id="datalist">
            <Detailslist P_YEAR={P_YEAR} CUSTOMERCODE={customerCode} />
          </div>
        </div>
      </div>
    </>
  );
}

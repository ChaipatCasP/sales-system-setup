import { useLocation } from "react-router-dom";
import CustomerList from "./CustomerList/CustomerList";
import React, { useEffect, useState } from "react";
import "./PageCustomer.css";
import { environment } from "../../environment/environment";
import moment from "moment/moment";
import DropDownYear from "../DropDownYear/DropDownYear";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import CustomerDetailsByProduct from "./CustomerDetailsByProduct/CustomerDetailsByProduct";

export default function PageCustomer(props) {
  const { P_YEAR } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");

  const WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_APPOINTMENT_LIST = WS_SALES_PLAN + "GET_APPOINTMENT_LIST_BY_CUST";

  const [getGET_APPOINTMENT_LIST, setGET_APPOINTMENT_LIST] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [P_CUST_CODE, setP_CUST_CODE] = useState("");
  const [P_MONTH, setP_MONTH] = useState("");

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  function onCustClick(value) {
    setP_CUST_CODE(value);

    setReturnData('');
    setReturnDataLocation('');
    setReturnDataRID('');
  }

  function onMonthChange(value) {
    setP_MONTH(value);

    setReturnData('');
    setReturnDataLocation('');
    setReturnDataRID('');
  }

  const [ReturnData, setReturnData] = useState([]);
  function onClickReturnData(value) {
    setReturnData(value);
  }
  const [ReturnDataLocation, setReturnDataLocation] = useState([]);
  function onClickReturnDataLocation(value) {
    setReturnDataLocation(value);
  }

  const [ReturnDataRID, setReturnDataRID] = useState([]);
  function onClickReturnRID(value) {
    setReturnDataRID(value);
  }

  return (
    <>
      <div className="app-content-page-cus">
        <div className="app-content-page-cus-left">
          <div className="app-content-page-cus-left-Search">
            <input
              className=""
              type="text"
              placeholder="Search Customer Code"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <CustomerList
            onClick={onCustClick}
            P_YEAR={P_YEAR}
            P_MONTH={P_MONTH}
            searchText={searchText}
          />
        </div>

        <div className="app-content-page-cus-center">
          <DropDownYear onMonthChange={onMonthChange} />

          <div className="page-cus-center-box">
            <CustomerDetails
              P_YEAR={P_YEAR}
              P_CUST_CODE={P_CUST_CODE}
              P_MONTH={P_MONTH}
              onClickReturnData={onClickReturnData}
              onClickReturnDataLocation={onClickReturnDataLocation}
              onClickReturnRID={onClickReturnRID}
            />
          </div>
        </div>

        <div className="app-content-page-cus-right">
          <CustomerDetailsByProduct
            mtName={ReturnData}
            location={ReturnDataLocation}
            RID={ReturnDataRID}
          />
        </div>
      </div>
    </>
  );
}

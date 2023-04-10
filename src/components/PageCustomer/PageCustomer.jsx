import { useLocation } from "react-router-dom";
import CustomerList from "./CustomerList/CustomerList";
import React, { useEffect, useState } from "react";
import "./PageCustomer.css";
import { environment } from "../../environment/environment";
import moment from "moment/moment";

export default function PageCustomer(props) {
  const { P_YEAR } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");

  const WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_APPOINTMENT_LIST = WS_SALES_PLAN + "GET_APPOINTMENT_LIST_BY_CUST";

  const [getGET_APPOINTMENT_LIST, setGET_APPOINTMENT_LIST] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [CustomerCode, setCustomerCode] = useState("");
  const [P_MONTH, setP_MONTH] = useState(false);

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);
    formdata.append("P_CUST_CODE", CustomerCode);

    const fdata = formdata;

    const fetchAPIs = async () => {
      const [api1Response] = await Promise.all([
        callAPI(GET_APPOINTMENT_LIST, fdata),
      ]);

      const api1Value = api1Response.result;
      setGET_APPOINTMENT_LIST(api1Value);
    };

    fetchAPIs();
  }, [props, CustomerCode, P_MONTH]);

  // useEffect(() => {
  //   RenderReturnData();
  // }, [getGET_APPOINTMENT_LIST]);

  // function RenderReturnData() {
  //   // console.log(getGET_APPOINTMENT_LIST);
  // }

  function onStaffClick(value) {
    setCustomerCode(value);
  }

  function formatdate(dateString) {
    const formattedDate = moment(dateString, "YYYYMMDD")
      .format("DD-MMM-YYYY")
      .toUpperCase();
    return formattedDate;
  }

  function formattime(timeString) {
    if (timeString !== "") {
      let hours = timeString.substr(0, 2);
      let minutes = timeString.substr(2);
      const formattedTime = hours + ":" + minutes;
      return formattedTime;
    } else {
      return "";
    }
  }

  function checkConfirmed(txt) {
    if (txt === "Y") {
      return "Confirmed";
    } else {
      return "un-Confirmed";
    }
  }

  function onMonthChange(value) {
    setP_MONTH(value);
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
            onClick={onStaffClick}
            P_YEAR={P_YEAR}
            P_USER={P_USER}
            searchText={searchText}
          />
        </div>

        <div className="app-content-page-cus-center">
          <select
            className="dropdown-year"
            onChange={(event) => onMonthChange(event.target.value)}
          >
            <option className="dropdown-option" value={""}></option>
            <option className="dropdown-option" value={"JAN"}>
              JAN
            </option>
            <option className="dropdown-option" value={"FEB"}>
              FEB
            </option>
            <option className="dropdown-option" value={"MAR"}>
              MAR
            </option>
            <option className="dropdown-option" value={"APR"}>
              APR
            </option>
            <option className="dropdown-option" value={"MAY"}>
              MAY
            </option>
            <option className="dropdown-option" value={"JUN"}>
              JUN
            </option>
            <option className="dropdown-option" value={"JUL"}>
              JUL
            </option>
            <option className="dropdown-option" value={"AUG"}>
              AUG
            </option>
            <option className="dropdown-option" value={"SEP"}>
              SEP
            </option>
            <option className="dropdown-option" value={"OCT"}>
              OCT
            </option>
            <option className="dropdown-option" value={"NOV"}>
              NOV
            </option>
            <option className="dropdown-option" value={"DEC"}>
              DEC
            </option>
          </select>

          <div className="page-cus-center-box">
            {getGET_APPOINTMENT_LIST.map((items, index) => (
              <div
                className="center-item"
                onClick={() => {
                  // onClickDetail(items.MonthName);
                }}
              >
                <div className="center-item-header">
                  {/* <h4>12 - Jan - {P_YEAR} - TEST </h4> */}
                  <h4>{formatdate(items.PLAN_DATE)}</h4>
                  <h5>
                    {formattime(items.PLAN_TIME_FROM)} -{" "}
                    {formattime(items.PLAN_TIME_TO)}
                  </h5>
                </div>
                <div className="center-item-detail">
                  <div className="center-item-detail-bar">
                    <div className="left">
                      <label className="txtheader">Agenda :</label>
                      <label className="txtvalue">{items.MEETING_TYPE}</label>
                    </div>
                    <div className="right">
                      <label className="txtheader">
                        {checkConfirmed(items.CONFIRM)}
                      </label>
                    </div>
                  </div>
                  <br />
                  <div>
                    <label className="txtheader">Check-in Time :</label>
                    <label className="txtvalue">
                      {formattime(items.CHECK_IN_TIME)}
                    </label>
                  </div>
                  <div>
                    <label className="txtheader">Check-out Time :</label>
                    <label className="txtvalue">
                      {formattime(items.CHECK_OUT_TIME)}
                    </label>
                  </div>
                  <br />
                  <div>
                    <label className="txtheader">Location :</label>
                    <label className="txtvalue">{items.LOCATION_ADDRESS}</label>
                  </div>

                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="app-content-page-cus-right">
          <h1>11</h1>

          <div className="right-items"></div>
        </div>
      </div>
    </>
  );
}

import CustomerList from "./CustomerList/CustomerList";
import React, { useEffect, useState } from "react";
import "./PageCustomer.css";
import DropDownYear from "../DropDownYear/DropDownYear";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import CustomerDetailsByProduct from "./CustomerDetailsByProduct/CustomerDetailsByProduct";

export default function PageCustomer(props) {
  const { P_YEAR } = props;
  const STAFFCODE = localStorage.getItem("STAFFCODE");
  const [searchText, setSearchText] = useState("");
  const [P_CUST_CODE, setP_CUST_CODE] = useState("");
  const [P_MONTH, setP_MONTH] = useState("");

  useEffect(() => {
    setP_CUST_CODE("");
  }, [props]);

  function onCustClick(value) {
    setP_CUST_CODE(value);
    setReturnData("");
    setReturnDataLocation("");
    setReturnDataRID("");
  }

  function onMonthChange(value) {
    setP_MONTH(value);
    setReturnData("");
    setReturnDataLocation("");
    setReturnDataRID("");
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
      <div className="viewingfor">
        <div className="viewingfor-header">Viewing for :</div>
        <div>
          <div className="app-staff-header" id={"header" + STAFFCODE}>
            <div className="app-stafflist-header-circle">
              <div className="circle"></div>
            </div>

            <div className="app-staff-header-content">
              <div>{STAFFCODE}</div>
              <div>{STAFFCODE}</div>
            </div>
          </div>
        </div>
      </div>
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
          <div className="DropDownYear">
            <DropDownYear onMonthChange={onMonthChange} />
          </div>
          <br />
          <br />
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
            P_YEAR={P_YEAR}
          />
        </div>
      </div>
    </>
  );
}

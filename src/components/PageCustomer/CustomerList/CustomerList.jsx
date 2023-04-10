import React, { useEffect, useState } from "react";
import { environment } from "../../../environment/environment";
import CustomerListDetail from "../CustomerListDetail/CustomerListDetail";

export default function CustomerList(props) {
  const { onClick, P_YEAR, P_MONTH, searchText } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_CUSTOMER_LIST = WS_SALES_PLAN + "GET_CUSTOMER_LIST_BY_SALES";
  const GET_VISITATION_INFO = WS_SALES_PLAN + "GET_VISITATION_INFO_BY_CUST";
  const [CustomerCode, setCustomerCode] = useState("");

  useEffect(() => {
    GET_CUSTOMER();
  }, [props]);

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  const [apiResponse, setApiResponse] = useState([]);
  function GET_CUSTOMER() {
    var formdata = new FormData();
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);

    const data = formdata;
    callAPI(GET_CUSTOMER_LIST, data).then((response) => {
      setApiResponse(response.result);
    });
  }

  function onCustClick(custcode) {
    setCustomerCode(custcode);
    changeBackgroundColor();
    changeDisplay(custcode);
    onClick(custcode);
  }

  function changeBackgroundColor() {
    const elements_header = document.querySelectorAll(".app-stafflist-header");
    elements_header.forEach((element) => {
      element.style.backgroundColor = "#d0cecf";
    });

    const elements_details = document.querySelectorAll(
      ".app-stafflist-details"
    );
    elements_details.forEach((element) => {
      element.style.display = "none";
    });
  }

  function changeDisplay(custcode) {
    const elements_header = document.getElementById("header" + custcode);
    elements_header.style.backgroundColor = "#007acc";

    const elements_details = document.getElementById("details" + custcode);
    elements_details.style.display = "";
  }

  return (
    <>
      {apiResponse
        .filter((txt) => {
          return txt.CUST_CODE.includes(searchText);
        })
        .map((items, index) => (
          <div
            className="app-stafflist"
            onClick={() => {
              onCustClick(items.CUST_CODE);
            }}
            id={items.CUST_CODE}
            key={index}
          >
            <div
              className="app-stafflist-header"
              id={"header" + items.CUST_CODE}
            >
              <div className="app-stafflist-header-circle">
                <div className="circle"></div>
              </div>

              <div className="app-stafflist-header-content">
                <div>{items.CUST_CODE}</div>
                <div>{items.CUST_NAME}</div>
              </div>
            </div>
            <div
              className="app-stafflist-details"
              id={"details" + items.CUST_CODE}
              style={{ display: "none" }}
            >
              <CustomerListDetail
                P_YEAR={P_YEAR}
                P_CUST_CODE={CustomerCode}
                MONTH={P_MONTH}
              />
            </div>
          </div>
        ))}
    </>
  );
}

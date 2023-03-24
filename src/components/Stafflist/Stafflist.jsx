import React, { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import "./Stafflist.css";
import StaffListDetails from "./Stafflistdetails/Stafflistdetails";

export default function StaffList(props) {
  const { onClick, P_YEAR } = props;
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";

  useEffect(() => {
    GET_STAFF_LIST();
    console.log({P_YEAR});
  }, []);

  const [apiResponse, setApiResponse] = useState([]);
  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  function GET_STAFF_LIST() {
    const endpoint = API_URL_WS_SALES_PLAN + "GET_STAFF_LIST";
    var formdata = new FormData();
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", "F2304");
    formdata.append("P_KEY", "");

    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      setApiResponse(response.result);
    });

    console.log('-----------------------');
    for (const [key, value] of data) {
      console.log(key +':'+value);
    }
    console.log('FN_GET_STAFF_LIST');
  }

  function onStaffClick(staffcode) {
    changeBackgroundColor();
    changeDisplay(staffcode);
    onClick(staffcode);
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

  function changeDisplay(staffcode) {
    const elements_header = document.getElementById("header" + staffcode);
    elements_header.style.backgroundColor = "#007acc";

    const elements_details = document.getElementById("details" + staffcode);
    elements_details.style.display = "";
  }

  return (
    <>
      {apiResponse.map((items, index) => (
        <div
          className="app-stafflist"
          onClick={() => {
            onStaffClick(items.STAFF_CODE);
          }}
          id={items.STAFF_CODE}
        >
          <div
            className="app-stafflist-header"
            id={"header" + items.STAFF_CODE}
          >
            <div className="app-stafflist-header-circle">
              <div className="circle"></div>
            </div>

            <div className="app-stafflist-header-content">
              <div>{items.STAFF_CODE}</div>
              <div>{items.STAFF_NAME}</div>
            </div>
          </div>
          <div
            className="app-stafflist-details"
            id={"details" + items.STAFF_CODE}
            style={{ display: "none" }}
          >
            <StaffListDetails P_USER={items.STAFF_CODE} P_YEAR={P_YEAR} />
          </div>
        </div>
      ))}
    </>
  );
}

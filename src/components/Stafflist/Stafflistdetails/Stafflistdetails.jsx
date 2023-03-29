import React, { useEffect, useState } from "react";
import "./Stafflistdetails.css";
import { environment } from "../../../environment/environment";

export default function StaffListDetails(props) {
  const { P_USER, P_YEAR } = props;
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_VISITATION_INFO = API_URL_WS_SALES_PLAN + "GET_VISITATION_INFO";

  useEffect(() => {
    FN_GET_VISITATION_INFO();
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

  function FN_GET_VISITATION_INFO() {
    var formdata = new FormData();
    const endpoint = GET_VISITATION_INFO;
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);

    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      setApiResponse(response.result);
    });

    // console.log("-----------------------");
    // for (const [key, value] of data) {
    //   console.log(key + ":" + value);
    // }
    // console.log("FN_GET_VISITATION_INFO");
  }

  if (apiResponse.length !== 0) {
    return (
      <>
        {apiResponse.map((items, index) => (
          <div className="app-stafflist" key={index}>
            <div>Total Customers :{items.TOTAL_CUSTOMERS}</div>
            <div>Planned Customers :{items.PLANNED_CUSTOMERS}</div>
            <br />
            <div>Visit Planned : {items.VISIT_PLANNED}</div>
            <div>Visit Completed : {items.VISIT_COMPLETED}</div>
            <br />
            <div>Sample Requested : {items.SAMPLE_REQUESTED}</div>
            <div>Quotation Created : {items.QUOTATION_CREATED}</div>
            <br />
            <div>Total Sales : {items.TOTAL_SALES}</div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        <a>No data</a>
      </>
    );
  }
}

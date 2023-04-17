import React, { useEffect, useState } from "react";
import { environment } from "../../../environment/environment";

export default function CustomerListDetail(props) {
  const { P_CUST_CODE, P_YEAR } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");

  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_VISITATION_INFO =
    API_URL_WS_SALES_PLAN + "GET_VISITATION_INFO_BY_CUST";

  useEffect(() => {
    FN_GET_VISITATION_INFO();
  }, [props]);

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
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);
    formdata.append("P_CUST_CODE", P_CUST_CODE);
    formdata.append("P_STAFF_CODE", P_USER);

    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      setApiResponse(response.result);
    });
  }

  if (apiResponse.length !== 0) {
    return (
      <>
        {apiResponse.map((items, index) => (
          <div className="app-stafflist" key={index}>
            <div>Visit Planned : {items.VISIT_PLAN}</div>
            <div>Visit Completed : {items.TOTAL_COMPLETE_VISIT}</div>
            <br />
            <div>Sample Requested : {items.SAMPLE_REQUESTED}</div>
            <div>Sample without Feedback : {items.SAMPLE_WITH_NO_FEEDBACK}</div>
            <br />
            <div>Active Quotation :{items.QUOTATION_ACTIVE}</div>
            <div>Quotation without Feedback : {items.QUOTATION_CREATED}</div>
            <br />
            <div>Quotation without Sale : N/A</div>

            <div>Total Sales : {Number(items.TOTAL_SALES).toLocaleString()}</div>
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

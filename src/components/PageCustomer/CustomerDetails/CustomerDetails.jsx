import React, { useEffect, useState } from "react";
import "./CustomerDetails.css";
import { environment } from "../../../environment/environment";

export default function CustomerDetails(props) {
  const { P_YEAR, P_CUST_CODE } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_APPOINTMENT_LIST = WS_SALES_PLAN + "GET_APPOINTMENT_LIST_BY_CUST";

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  const [getGET_APPOINTMENT_LIST, setGET_APPOINTMENT_LIST] = useState([]);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);
    formdata.append("P_CUST_CODE", P_CUST_CODE);

    const fdata = formdata;

    const fetchAPIs = async () => {
      const [api1Response] = await Promise.all([
        callAPI(GET_APPOINTMENT_LIST, fdata),
      ]);

      const api1Value = api1Response.result;
      setGET_APPOINTMENT_LIST(api1Value);
    };

    fetchAPIs();
  }, [props]);

  return <></>;
}

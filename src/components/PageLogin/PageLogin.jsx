import React, { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import { useNavigate } from "react-router-dom";

export default function PageLogin() {
  const API_URL_WS_ERP = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const API_URL_WS_CON = environment.baseUrl + "apip/ws_connectlogin/";
  const WEB_BYPASS_LOGIN = API_URL_WS_ERP + "GET_WEB_BYPASS_LOGIN";
  const GET_USER_BY_PASS = API_URL_WS_CON + "GET_USER_BY_PASS";
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    year: "numeric",
  });
  const [P_USER, setP_USER] = useState("");

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  useEffect(() => {
    // อ่านค่า ID จาก URL
    const params = new URLSearchParams(window.location.search);
    const ID = params.get("ID");
    const P_USER = localStorage.getItem("P_USER");
    const P_NAME = localStorage.getItem("P_NAME");

    if (ID === null) {
      if (P_USER === "" || P_NAME === "") {
      } else {
        navigate("/Dashboard");
      }
    } else {
      // logout();
      BYPASS_LOGIN(ID);
    }
  });

  const [apiResponse, setApiResponse] = useState([]);
  function BYPASS_LOGIN(id) {
    const endpoint = WEB_BYPASS_LOGIN;
    var formdata = new FormData();
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", "JBT04");
    formdata.append("P_KEY", "");
    formdata.append("P_SEQ_ID", id);

    const data = formdata;
    callAPI(endpoint, data)
      .then((response) => {
        console.log(response);
        setApiResponse(response.result);
      })
      .then(
        (data) => {
          SetlocalStorage(data);
        },
        (error) => {}
      );
  }

  const [api2Response, setApi2Response] = useState([]);
  function USER_BY_PASS(P_LOGIN) {
    const endpoint = GET_USER_BY_PASS;
    var formdata = new FormData();
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", "JBT04");
    formdata.append("P_KEY", "");
    formdata.append("P_LOGIN", P_LOGIN);

    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      setApi2Response(response.result);
    });
  }

  function SetlocalStorage() {
    let arrUSERNAME = apiResponse.map((items, index) => {
      return items.USERNAME;
    });

    let USERNAME = "";
    arrUSERNAME.forEach((tt) => {
      USERNAME = String(tt);
    });

    let arrCOM = apiResponse.map((items, index) => {
      return items.COMPANY;
    });

    let COMPANY = "";
    arrCOM.forEach((tt) => {
      COMPANY = String(tt);
    });

    localStorage.setItem("P_COM", COMPANY);
    localStorage.setItem("P_USER", USERNAME);
    localStorage.setItem("P_YEAR", formattedDate);
    setP_USER(USERNAME);

    const endpoint = GET_USER_BY_PASS;
    var formdata = new FormData();
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", "JBT04");
    formdata.append("P_KEY", "");
    formdata.append("P_LOGIN", USERNAME);

    const data = formdata;
    callAPI(endpoint, data)
      .then((response) => {
        setApi2Response(response.result);
      })
      .then(
        (data) => {
          // SetlocalStorageName();
        },
        (error) => {}
      );
  }

  useEffect(() => {
    SetlocalStorageName();
  }, [api2Response]);

  function SetlocalStorageName() {
    let arrUSERNAME = api2Response.map((items, index) => {
      return items.NAME_E;
    });

    let P_NAME = "";
    arrUSERNAME.forEach((tt) => {
      P_NAME = String(tt);
    });
    console.log(P_NAME);
    localStorage.setItem("P_NAME", P_NAME);

    const local_P_USER = localStorage.getItem("P_USER");
    const local_P_NAME = localStorage.getItem("P_NAME");

    if (local_P_USER !== "" && local_P_NAME !== "") {
      navigate("/Dashboard");
    }
  }

  function logout() {
    localStorage.setItem("P_COM", "");
    localStorage.setItem("P_USER", "");
    localStorage.setItem("STAFFCODE", "");
    localStorage.setItem("P_MONTH", "");
    localStorage.setItem("P_YEAR", "");
  }

  return <>Login</>;
}

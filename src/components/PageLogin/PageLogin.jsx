import React, { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import { useNavigate } from "react-router-dom";

export default function PageLogin() {
  const API_URL_WS_ERP = environment.baseUrl + "apip/WS_ERP/";
  const WEB_BYPASS_LOGIN = API_URL_WS_ERP + "WEB_BYPASS_LOGIN";
  const navigate = useNavigate();

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
    const id = params.get("ID");

    BYPASS_LOGIN(id);
  }, []);

  const [apiResponse, setApiResponse] = useState([]);
  function BYPASS_LOGIN(id) {
    const endpoint = WEB_BYPASS_LOGIN;
    var formdata = new FormData();
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", "JBT04");
    formdata.append("P_KEY", "");
    formdata.append("P_SEQ_ID", id);

    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      //   console.log(response.flag);
      setApiResponse(response.result);
    });
  }

  useEffect(() => {
    test();
  }, [apiResponse]);

  function test() {
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

    console.log(USERNAME);
    localStorage.setItem("P_COM", COMPANY);
    localStorage.setItem("P_USER", USERNAME);

    const username = localStorage.getItem("P_USER");

    if (username !== "") {
      navigate("/PageStaff");
    } 
  }

  return <>Login</>;
}

// F2304 = 32973883
// F0222 = 102280880
// {
//     "jwt": 1,
//     "flag": 0,
//     "message": null,
//     "message_system": "ORA-01403: no data found\nORA-06512: at &quot;JBT04.WS_ERP&quot;, line 112\nORA-06512: at line 1",
//     "package_name": "WS_ERP",
//     "function_name": "WEB_BYPASS_LOGIN",
//     "records": 0,
//     "result": []
// }

// {
//     "jwt": 1,
//     "flag": 1,
//     "message": "",
//     "package_name": "WS_ERP",
//     "function_name": "WEB_BYPASS_LOGIN",
//     "records": 1,
//     "result": [
//         {
//             "USERNAME": "F2304",
//             "COMPANY": "JB",
//             "MODULE_NAME": ""
//         }
//     ]
// }

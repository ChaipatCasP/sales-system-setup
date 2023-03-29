import React, { useEffect, useState } from "react";
import { environment } from "../../../environment/environment";

export default function Services(props) {
  // console.log(props);
  const API_URL = environment.baseUrl + "apip/WS_SALES_TARGET_SETUP/";
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const { P_COM, P_USER, P_SALES_CHANNEL_CODE, txtfunc } = props;
  const [data, setData] = useState([]);

  var formdata = new FormData();

  // GET_SALES_LIST();

  function GET_SALES_LIST() {
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_SALES_CHANNEL_CODE", P_SALES_CHANNEL_CODE);
  }

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  useEffect(() => {
    //  GET_STAFF_LIST();
    // handButtonClick();
    // fetch(API_URL + "GET_SALES_LIST", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setData(data.result));
  });
  //console.log(data);

  function onStaffClick(text) {
    alert(text);
  }

  //   fetchUserData(requestOptions,txtfunc);

  function fetchUserData(userId, txtfunc) {
    fetch(API_URL + txtfunc, userId)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }

  const bodyTxt = data.map((items, index) => {
    return (
      // <StaffInformation key={index} staff={items} onStaffClick={onStaffClick} />
      <></>
    );
  });

  const [apiResponse, setApiResponse] = useState(null);
  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  function GET_STAFF_LIST(){
    const endpoint = API_URL_WS_SALES_PLAN + "GET_STAFF_LIST";

    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", "F2304");
    formdata.append("P_KEY", "");

    const data = formdata;
     callAPI(endpoint,data).then(response => {
      setApiResponse(response);
      console.log(apiResponse);
     })
  }


  // console.log(apiResponse);
  return <div className="app-services">{bodyTxt}</div>;
}


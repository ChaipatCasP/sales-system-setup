import React, { useEffect, useState } from "react";

export default function Services(props) {
  const { P_COM, P_USER, P_SALES_CHANNEL_CODE } = props;
  const [data, setData] = useState([]);

  var formdata = new FormData();
  formdata.append("P_COM", P_COM);
  formdata.append("P_USER", P_USER);
  formdata.append("P_SALES_CHANNEL_CODE", P_SALES_CHANNEL_CODE);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  useEffect(() => {
    fetch(
      "https://api-dev.jagota.com/apip/WS_SALES_TARGET_SETUP/GET_SALES_LIST",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setData(data.result));
  });

  function onStaffClick(text) {
    alert(text);
  }

//   console.log(data);

  const text = data.map((items, index) => {
    return (
      // <StaffInformation key={index} staff={items} onStaffClick={onStaffClick} />
      <></>
    );
  });

  return <div className="app-services">{text}</div>;
}

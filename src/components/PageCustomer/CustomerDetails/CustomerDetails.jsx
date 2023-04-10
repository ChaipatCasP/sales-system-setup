import React, { useEffect, useState } from "react";
import "./CustomerDetails.css";
import { environment } from "../../../environment/environment";
import moment from "moment";
import walking from "../../../components/assets/img/walking.png";
import calling from "../../../components/assets/img/calling.png";
import loader from "../../../components/assets/img/loader.gif";

export default function CustomerDetails(props) {
  const {
    P_YEAR,
    P_CUST_CODE,
    P_MONTH,
    onClickReturnData,
    onClickReturnDataLocation,
    onClickReturnRID,
  } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_APPOINTMENT_LIST = WS_SALES_PLAN + "GET_APPOINTMENT_LIST_BY_CUST";
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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
    setIsLoaded(false);
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
      setIsLoaded(true);
    };

    if (P_CUST_CODE !== "") {
      fetchAPIs();
    }else{
      setGET_APPOINTMENT_LIST([])
      setIsLoaded(true);
    }
  }, [props]);

  function formatdate(dateString) {
    const formattedDate = moment(dateString, "YYYYMMDD")
      .format("DD-MMM-YYYY")
      .toUpperCase();
    return formattedDate;
  }

  function formattime(timeString) {
    if (timeString !== "") {
      let hours = timeString.substr(0, 2);
      let minutes = timeString.substr(2);
      const formattedTime = hours + ":" + minutes;
      return formattedTime;
    } else {
      return "";
    }
  }

  function checkConfirmed(txt) {
    if (txt === "Y") {
      return "Confirmed";
    } else {
      return "un-Confirmed";
    }
  }

  function checkStatus(txt) {
    if (txt === "V") {
      return walking;
    } else if (txt === "C") {
      return calling;
    } else {
      return "";
    }
  }

  const style_visits = {
    backgroundColor: "lightblue",
    color: "white",
    border: "none",
  };

  function onclick(CONTACT_NAME, CONTACT_NUMBER, location, RID) {
    onClickReturnData(CONTACT_NAME);

    if (CONTACT_NUMBER === "") {
      onClickReturnData(CONTACT_NAME);
    } else if (CONTACT_NUMBER !== "") {
      onClickReturnData(CONTACT_NAME + "|" + CONTACT_NUMBER);
    }
    onClickReturnDataLocation(location);
    onClickReturnRID(RID);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img className="loaderImage" src={loader} alt="loader" />
          </div>
        </div>
      </div>
    );
  } else if (getGET_APPOINTMENT_LIST.length > 0) {
    return (
      <>
        {getGET_APPOINTMENT_LIST
          .filter((row) => formatdate(row.PLAN_DATE).includes(P_MONTH))
          .map((items, index) => (
            <div
              className="center-item"
              onClick={(event) =>
                onclick(
                  items.CONTACT_NAME,
                  items.CONTACT_NUMBER,
                  items.LOCATION_ADDRESS,
                  items.PLAN_ID
                )
              }
            >
              <div className="center-item-header">
                <h4>{formatdate(items.PLAN_DATE)}</h4>
                <h5>
                  {formattime(items.PLAN_TIME_FROM)} -{" "}
                  {formattime(items.PLAN_TIME_TO)}
                </h5>
              </div>

              <div className="center-item-header-status">
                <div className="left">
                  <img
                    className="walkingImage"
                    src={checkStatus(items.TASK_TYPE)}
                    alt="loader"
                  />
                </div>

                <div className="right">
                  <label
                    className="txtheader"
                    style={{
                      backgroundColor:
                        items.CONFIRM === "Y" ? "#03ad53" : "#fee797",
                      color: items.CONFIRM === "Y" ? "white" : "black",
                      border: "none",
                    }}
                  >
                    {checkConfirmed(items.CONFIRM)}
                  </label>
                </div>
              </div>

              <div className="center-item-detail">
                <div className="center-item-detail-bar">
                  <div className="left">
                    <label className="txtheader">Agenda :</label>
                    <label className="txtvalue">{items.MEETING_TYPE}</label>
                  </div>
                </div>
                <br />
                <div>
                  <label className="txtheader">Check-in Time :</label>
                  <label className="txtvalue">
                    {formattime(items.CHECK_IN_TIME)}
                  </label>
                </div>
                <div>
                  <label className="txtheader">Check-out Time :</label>
                  <label className="txtvalue">
                    {formattime(items.CHECK_OUT_TIME)}
                  </label>
                </div>
                <br />
                <div>
                  <label className="txtheader">Location :</label>
                  <label className="txtvalue">{items.LOCATION_ADDRESS}</label>
                </div>

                <br />
              </div>
            </div>
          ))}
      </>
    );
  }
}

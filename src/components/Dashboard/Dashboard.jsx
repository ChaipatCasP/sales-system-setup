import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environment/environment";

export default function Dashboard() {
  const navigate = useNavigate();
  const [xxx, setXxx] = useState("");
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const P_NAME = localStorage.getItem("P_NAME");
  //********************************************************************//
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_STAFF_LIST = API_URL_WS_SALES_PLAN + "GET_STAFF_LIST_WITH_CHANNEL";

  useEffect(() => {
    if (P_COM === "" || P_USER === "" || P_NAME === "") {
      navigate("/PageStaff");
    }
  });
  //********************************************************************//

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }
  //********************************************************************//
  const [ResStaffList, setResStaffList] = useState([]);
  function FN_GET_STAFF_LIST() {
    var formdata = new FormData();
    const endpoint = GET_STAFF_LIST;
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      setResStaffList(response.result);
    });
  }
  //********************************************************************//

  useEffect(() => {
    FN_GET_STAFF_LIST();
  }, []);

  useEffect(() => {
    console.log(ResStaffList);
  }, [ResStaffList]);

  return (
    <>
    <button>**</button>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">SI.No.</th>
            <th rowSpan="2">Customer</th>
            <th rowSpan="2">Staff</th>
            <th rowSpan="2">Visits</th>
            <th
              colSpan="3"
              style={{
                border: "solid",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
            >
              Net Product
            </th>
            <th rowSpan="2">Closed</th>
            <th rowSpan="2">Loss</th>
            <th
              colSpan="3"
              style={{
                border: "solid",
                borderRight: "none",
                borderLeft: "none",
                borderTop: "none",
              }}
            >
              Sales
            </th>
          </tr>

          <tr>
            <th>Jan 23</th>
            <th>Feb 23</th>
            <th>Mar 23</th>
            <th>Jan 23</th>
            <th>Feb 23</th>
            <th>Mar 23</th>
          </tr>
        </thead>

        <tbody>
          {ResStaffList.map((items, index) => (
            <tr key={index}>
              <td className="tdcenter">{index + 1}</td>
              <td>CH110-Manis</td>
              <td>F1123 - Kiraporn {items.STAFF_NAME}</td>
              <td className="tdcenter">15</td>
              <td className="tdcenter">20</td>
              <td className="tdcenter">21</td>
              <td className="tdcenter" style={{ color: "red" }}>
                19
              </td>
              <td className="tdcenter">19</td>
              <td className="tdcenter">19</td>
              <td className="tdcenter">1.2M</td>
              <td className="tdcenter">1.8M</td>
              <td className="tdcenter">1.4M</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

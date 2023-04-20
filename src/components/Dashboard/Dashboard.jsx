import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environment/environment";

// Modal.setAppElement('#root');

import {
  BsFillPersonFill,
  BsFillPatchExclamationFill,
  BsFillDiagram3Fill,
  BsFillCalendarCheckFill,
} from "react-icons/bs";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function Dashboard() {
  const navigate = useNavigate();
  const [xxx, setXxx] = useState("");
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const P_NAME = localStorage.getItem("P_NAME");
  //********************************************************************//
  const [resStaffList, setResStaffList] = useState([]);
  const [resCustomerPerform, setCustomerPerform] = useState([]);
  const [datavalue, setDatavalue] = useState([]);
  const [staffCode, setStaffCode] = useState("");
  const [channalCode, setChannalCode] = useState("");
  const [resMonthList, setResMonthList] = useState([]);

  //********************************************************************//
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_STAFF_LIST = API_URL_WS_SALES_PLAN + "GET_STAFF_LIST_WITH_CHANNEL";
  const GET_CUST_PERFORM = API_URL_WS_SALES_PLAN + "GET_CUSTOMER_PERFORMANCE";

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    // year: "numeric",
    month: "short",
  });
  const currentMonth = formattedDate;
  //********************************************************************//

  useEffect(() => {
    if (P_COM === "" || P_USER === "" || P_NAME === "") {
      navigate("/PageLogin");
    } else {
      GenMonth();
    }
  }, []);
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
  function FN_GET_CUST_PERFORM() {
    var formdata = new FormData();
    const endpoint = GET_CUST_PERFORM;
    const P_NET_PRODUCT_DATE = "01-" + currentMonth + "-2021";
    const P_SALES_DATE = "01-" + currentMonth + "-2021";

    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_SALES_CODE", staffCode);
    // formdata.append("P_SALES_CODE", "F2304");
    formdata.append("P_SALES_CHANNEL_CODE", channalCode);
    formdata.append("P_VISIT_YEAR", "2021");
    formdata.append("P_NET_PRODUCT_DATE", P_NET_PRODUCT_DATE);
    formdata.append("P_SALES_DATE", P_SALES_DATE);
    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      setCustomerPerform(response.result);
    });
    for (const [key, value] of data) {
      console.log(key + ":" + value);
    }
  }
  //********************************************************************//
  useEffect(() => {
    FN_GET_STAFF_LIST();
  }, []);

  useEffect(() => {
    FN_GET_CUST_PERFORM();
  }, [staffCode, channalCode]);
  //********************************************************************//
  const dataReturn = [];
  useEffect(() => {
    const uniqueData = resStaffList.reduce((acc, current) => {
      if (!acc[current.SALES_CHANNEL_CODE]) {
        acc[current.SALES_CHANNEL_CODE] = current;
      }
      return acc;
    }, {});

    Object.values(uniqueData).map((item) =>
      dataReturn.push({
        SALES_CHANNEL_CODE: item.SALES_CHANNEL_CODE,
        SALES_CHANNEL_NAME: item.SALES_CHANNEL_NAME,
      })
    );
    setDatavalue(dataReturn);
  }, [resStaffList]);
  //********************************************************************//

  function onStaffChange(staffCode) {
    setStaffCode(staffCode);
  }
  //********************************************************************//
  function onChannalChange(channalCode) {
    setChannalCode(channalCode);
  }
  //********************************************************************//
  //********************************************************************//
  function openpopup() {
    alert("test");
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    // content: {
    //   top: '50%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //   transform: 'translate(-50%, -50%)',
    // },

    content: {
      backgroundColor: "white",
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      borderTopLeftRadius: "30px",
      borderTopRightRadius: "30px",
    },
  };

  function onYearChange(value) {
    alert(value);
  }

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

  const dataReturnMonth = [];
  function GenMonth() {
    for (let iMonth = 1; iMonth <= 12; iMonth++) {
      dataReturnMonth.push({
        IMOUNTH: iMonth,
        MOUNTH: getMonthName(iMonth),
      });
    }
    setResMonthList(dataReturnMonth);
  }

  //********************************************************************//
  function onclickCustomer(value) {
    navigate("/VisitationReportByCustomer");
  }
  function onclickStaff(value) {
    navigate("/PageStaff");
  }

  function checkNum(value1, value2, value3, value4) {
    if (value1 > value2 || value3 > value4) {
      return (
        <>
          <label style={{ color: "red", fontWeight: "800" }}>*</label>
        </>
      );
    } else {
      return <>&nbsp;</>;
    }
  }
  //********************************************************************//
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div className="AdvancedFilter">
          <label className="la-AdvancedFilter">Advanced Filter</label>
          <div className="dropdown">
            <select
              onChange={(event) => onYearChange(event.target.value)}
              defaultValue=""
              style={{
                width: "150px",
                textAlign: "center",
                borderRadius: "50px",
              }}
            >
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
            </select>
            <span className="icon">
              <BsFillCalendarCheckFill />
            </span>
          </div>
        </div>

        <div className="AdvancedFilter">
          <div className="in-AdvancedFilter">
            <label>Net Product</label>
            <br />
            <label>Set Month :</label>
          </div>
          <div className="in-AdvancedFilter">
            <label style={{ paddingLeft: "75px" }}>Month 1</label>
            <br />
            <br />
            <select onChange={(event) => onYearChange(event.target.value)}>
              {resMonthList.map((items, index) => (
                <option key={index} value={items.IMOUNTH}>
                  {items.MOUNTH}
                </option>
              ))}
            </select>
          </div>

          <div className="in-AdvancedFilter">
            <label style={{ paddingLeft: "75px" }}>Month 2</label>
            <br />
            <br />
            <select
              onChange={(event) => onYearChange(event.target.value)}
              disabled
            >
              {resMonthList.map((items, index) => (
                <option key={index} value={items.IMOUNTH}>
                  {items.MOUNTH}
                </option>
              ))}
            </select>
          </div>

          <div className="in-AdvancedFilter">
            <label style={{ paddingLeft: "75px" }}>Month 3</label>
            <br />
            <br />
            <select
              onChange={(event) => onYearChange(event.target.value)}
              disabled
            >
              {resMonthList.map((items, index) => (
                <option key={index} value={items.IMOUNTH}>
                  {items.MOUNTH}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <button onClick={handleCloseModal}>Close Modal</button> */}
      </Modal>

      <div className="headerDashboard">
        <label className="la-headerDashboard">
          Customer Performance - Dashboard
        </label>

        {/* <input className="managerprofile" value={P_NAME}></input> */}

        <div className="input-with-icon">
          <span className="icon">
            <BsFillPersonFill />
          </span>
          <input
            className="managerprofile"
            type="text"
            value={P_NAME}
            disabled
          />
        </div>

        <div className="dropdown">
          <select
            onChange={(event) => onChannalChange(event.target.value)}
            defaultValue=""
          >
            <option value=""></option>
            {datavalue.map((items, index) => (
              <option key={index} value={items.SALES_CHANNEL_CODE}>
                {items.SALES_CHANNEL_NAME}
              </option>
            ))}
          </select>
          <span className="icon">
            <BsFillDiagram3Fill />
          </span>
        </div>

        {/* STAFF */}
        <div className="dropdown">
          <select
            onChange={(event) => onStaffChange(event.target.value)}
            defaultValue=""
          >
            <option value=""></option>

            {resStaffList.map((items, index) => (
              <option key={index} value={items.STAFF_CODE}>
                {items.STAFF_CODE} - {items.STAFF_NAME}
              </option>
            ))}
          </select>
          <span className="icon">
            <BsFillPersonFill />
          </span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th rowSpan="2">SI.No.</th>
            <th rowSpan="2">Customer</th>
            <th rowSpan="2">Visits</th>
            <th colSpan="3" className="thcol-3">
              Net Product{" "}
              <label className="clamationFill" onClick={handleOpenModal}>
                <BsFillPatchExclamationFill />
              </label>
            </th>
            <th rowSpan="2">Closed</th>
            <th rowSpan="2">Loss</th>
            <th colSpan="3" className="thcol-3">
              Sales{" "}
              <label className="clamationFill" onClick={handleOpenModal}>
                <BsFillPatchExclamationFill />
              </label>
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
          {resCustomerPerform.map((items, index) => (
            <tr key={index}>
              <td className="tdcenter">
                {index + 1}{" "}
                {checkNum(
                  items.PRODUCT_LAST_MONTH,
                  items.PRODUCT_CURRENT_MONTH,
                  items.SALES_LAST_MONTH,
                  items.SALES_CURRENT_MONTH
                )}{" "}
              </td>
              <td
                className="customercilck"
                onClick={() => {
                  onclickCustomer(items.CUST_CODE);
                }}
              >
                {items.CUST_CODE} - {items.CUST_NAME}
              </td>
             
              <td
                className="tdcenter customercilck"
                onClick={() => {
                  onclickCustomer(items.CUST_CODE);
                }}
                style={{ textDecorationLine: "underline" }}
              >
                {items.VISIT_COUNT}
              </td>
              <td className="tdcenter">{items.PRODUCT_SECOND_LAST_MONTH}</td>
              <td className="tdcenter">{items.PRODUCT_LAST_MONTH}</td>
              <td className="tdcenter" style={{ color: "red" }}>
                {items.PRODUCT_CURRENT_MONTH}
              </td>
              <td className="tdcenter">N/A</td>
              <td className="tdcenter">N/A</td>
              <td className="tdcenter">
                {Number(items.SALES_SECOND_LAST_MONTH).toLocaleString()}
              </td>
              <td className="tdcenter">
                {Number(items.SALES_LAST_MONTH).toLocaleString()}
              </td>
              <td className="tdcenter">
                {Number(items.SALES_CURRENT_MONTH).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

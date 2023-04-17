import React, { useEffect, useState } from "react";
import { environment } from "../../../environment/environment";
import loader from "../../../components/assets/img/loader.gif";
import moment from "moment";

export default function CustomerListDetail(props) {
  const { P_YEAR, P_CUST_CODE, MONTH } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const P_STAFF_CODE = localStorage.getItem("STAFFCODE");
  const WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_VISITATION_INFO = WS_SALES_PLAN + "GET_VISITATION_INFO_BY_CUST";
  const GET_APPOINTMENT_LIST = WS_SALES_PLAN + "GET_APPOINTMENT_LIST_BY_CUST";

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  function formatdate(dateString) {
    const formattedDate = moment(dateString, "YYYYMMDD")
      .format("DD-MMM-YYYY")
      .toUpperCase();
    return formattedDate;
  }

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  const [getGET_VISITATION_INFO, setGET_VISITATION_INFO] = useState([]);
  const [getGET_APPOINTMENT_LIST, setGET_APPOINTMENT_LIST] = useState([]);
  useEffect(() => {
    setIsLoaded(false);
    var formdata = new FormData();
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);
    formdata.append("P_CUST_CODE", P_CUST_CODE);
    formdata.append("P_STAFF_CODE", P_STAFF_CODE);
    
    const fdata = formdata;

    const fetchAPIs = async () => {
      const [api1Response, api2Response] = await Promise.all([
        callAPI(GET_VISITATION_INFO, fdata),
        callAPI(GET_APPOINTMENT_LIST, fdata),
      ]);

      const api1Value = api1Response.result;
      const api2Value = api2Response.result;

      setGET_VISITATION_INFO(api1Value);
      setGET_APPOINTMENT_LIST(api2Value);
    };

    fetchAPIs();
  }, [props]);


  useEffect(() => {
    Calculate();
  }, [getGET_APPOINTMENT_LIST]);

  function Calculate() {
    let VisitThisMonth = getGET_APPOINTMENT_LIST.filter((row) =>
      formatdate(row.PLAN_DATE).includes(MONTH)
    );

    let completedThisMonth = getGET_APPOINTMENT_LIST
      .filter((row) => formatdate(row.PLAN_DATE).includes(MONTH))
      .filter((row) => row.CHECK_OUT_DATE !== "");

    const newArray1 = getGET_VISITATION_INFO.map((item) => {
      return {
        ...item,
        VisitThisMonth: VisitThisMonth.length,
        completedThisMonth: completedThisMonth.length,
      };
    });

    setGET_VISITATION_INFO(newArray1);
    setIsLoaded(true);
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return (
  //     <div className="container">
  //       <div className="row">
  //         <div className="col-12">
  //           <img className="loaderImage" src={loader} alt="loader" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else 
  //  if (getGET_VISITATION_INFO.length > 0) {
    return (
      <>
        {getGET_VISITATION_INFO.map((items, index) => (
          <div className="" key={{index}}>
            <div className="">
              <label>Visits Planned for {P_YEAR} : </label>
              <label>{items.VISIT_PLAN}</label>
            </div>
            <div className="">
              <label>Visits Planned for this Month : </label>
              <label>{items.VisitThisMonth}</label>
            </div>
            <br />
            <div className="">
              <label>Total Completed Visits : </label>
              <label>{items.TOTAL_COMPLETE_VISIT}</label>
            </div>
            <div className="">
              <label>Completed Visits for this Month : </label>
              <label>{items.completedThisMonth}</label>
            </div>
            <br />
            <div className="">
              <label>Sample Requested : </label>
              <label>{items.SAMPLE_REQUESTED}</label>
            </div>
            <div className="">
              <label>Sample with No Feedback : </label>
              <label>{items.SAMPLE_WITH_NO_FEEDBACK}</label>
            </div>
            <br />
            <div className="">
              <label>Quotation Created({P_YEAR}) : </label>
              <label>{items.QUOTATION_CREATED}</label>
            </div>
            <div className="">
              <label>Quatation with No-Sale : </label>
              <label>{items.QUOTATION_WITH_NO_SALE}</label>
            </div>
            <br />
            <div className="">
              <label>Total Sales : </label>
              <label>{items.TOTAL_SALES}</label>
            </div>
            <br />
          </div>
        ))}
      </>
    );
  //  }
}

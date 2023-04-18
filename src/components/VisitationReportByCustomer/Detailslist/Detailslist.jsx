import "./Detailslist.css";
import React, { useEffect, useState } from "react";
import { environment } from "../../../environment/environment";
import loader from "../../../components/assets/img/loader.gif";
import { useNavigate } from "react-router-dom";

export default function Detailslist(props) {
  const { P_YEAR, CUSTOMERCODE } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const [datavalue, setDatavalue] = useState([]);
  const dataReturn = [];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [getGET_QUOTATION, setGET_QUOTATION] = useState([]);
  const [getGET_VISITATION, setGET_VISITATION] = useState([]);
  const [getGET_ITEMS_COUNT, setGET_ITEMS_COUNT] = useState([]);
  const [getGET_TOTAL_SALES, setGET_TOTAL_SALES] = useState([]);
  const [getGET_SAMPLE, setGET_SAMPLE] = useState([]);

  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_QUOTATION = API_URL_WS_SALES_PLAN + "GET_QUOTATION_CNT_BY_CUSTOMER";
  const GET_VISITATION = API_URL_WS_SALES_PLAN + "GET_VISITATION_DETAIL";
  const GET_TOTAL_SALES = API_URL_WS_SALES_PLAN + "GET_TOTAL_SALES";
  const GET_SAMPLE = API_URL_WS_SALES_PLAN + "GET_SAMPLE_REQUEST_CNT_BY_CUST";
  const GET_ITEMS_COUNT = API_URL_WS_SALES_PLAN + "GET_ITEMS_COUNT";

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  }

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  useEffect(() => {
    setIsLoaded(false);
    var formdata = new FormData();
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);
    formdata.append("P_STAFF_CODE", "");
    formdata.append("P_CUST_CODE", CUSTOMERCODE);
    const fdata = formdata;

    const fetchAPIs = async () => {
      const [
        api1Response,
        api2Response,
        api3Response,
        api4Response,
        api5Response,
      ] = await Promise.all([
        callAPI(GET_QUOTATION, fdata),
        callAPI(GET_VISITATION, fdata),
        callAPI(GET_ITEMS_COUNT, fdata),
        callAPI(GET_TOTAL_SALES, fdata),
        callAPI(GET_SAMPLE, fdata),
      ]);

      const api1Value = api1Response.result;
      const api2Value = api2Response.result;
      const api3Value = api3Response.result;
      const api4Value = api4Response.result;
      const api5Value = api5Response.result;

      setGET_QUOTATION(api1Value);
      setGET_VISITATION(api2Value);
      setGET_ITEMS_COUNT(api3Value);
      setGET_TOTAL_SALES(api4Value);
      setGET_SAMPLE(api5Value);
    };

    fetchAPIs();
  }, [props]);

  useEffect(() => {
    Calculate();
  }, [
    getGET_QUOTATION,
    getGET_VISITATION,
    getGET_ITEMS_COUNT,
    getGET_TOTAL_SALES,
    getGET_SAMPLE,
  ]);

  function Calculate() {
    for (let iMonth = 1; iMonth <= 12; iMonth++) {
      let MonthName = getMonthName(iMonth);

      let VisitPlanned = getGET_VISITATION.filter((row) =>
        row.PLAN_DATETIME.includes(MonthName)
      );

      let VisitCompleted = getGET_VISITATION
        .filter((row) => row.PLAN_DATETIME.includes(MonthName))
        .filter((row) => row.CHECK_OUT_DATE !== "");

      let valSamplesRequested = getGET_SAMPLE
        .filter((row) => getMonthName(row.MONTH_NO).includes(MonthName))
        .map((items, index) => {
          return items.TOTAL_COUNT;
        });

      let SamplesRequested = 0;
      valSamplesRequested.forEach((tt) => {
        SamplesRequested = Number(tt);
      });

      let valueQUOTATION = getGET_QUOTATION
        .filter((row) => getMonthName(row.MONTH_NO).includes(MonthName))
        .map((items, index) => {
          return items.TOTAL_COUNT;
        });

      let QuotationsCreated = 0;
      valueQUOTATION.forEach((tt) => {
        QuotationsCreated = Number(tt);
      });

      let valNetItems = getGET_ITEMS_COUNT
        .filter((row) => getMonthName(row.MONTH_NO).includes(MonthName))
        .map((items, index) => {
          return Number(items.NET_ITEM_COUNT);
        });

      let NetItems = 0;
      valNetItems.forEach((tt) => {
        NetItems = Number(tt);
      });

      let valMonthlySale = getGET_TOTAL_SALES
        .filter((row) => getMonthName(row.MONTH).includes(MonthName))
        .map((items, index) => {
          return Number(items.TOTAL);
        });

      let MonthlySale = 0;
      valMonthlySale.forEach((tt) => {
        MonthlySale = Number(tt);
      });

      dataReturn.push({
        P_USER: CUSTOMERCODE,
        P_YEAR: P_YEAR,
        MonthName: MonthName,
        VisitPlanned: VisitPlanned.length.toLocaleString(),
        VisitCompleted: VisitCompleted.length.toLocaleString(),
        SamplesRequested: SamplesRequested,
        QuotationsCreated: QuotationsCreated.toLocaleString(),
        NetItems: NetItems,
        MonthlySale: MonthlySale.toLocaleString(),
      });
    }

    setDatavalue(dataReturn);
    setIsLoaded(true);
  }

  const navigate = useNavigate();
  function onClickDetail(value) {
    // localStorage.setItem("P_MONTH", value);
    // navigate("/PageCustomer");
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
  } else if (CUSTOMERCODE !== "" && P_YEAR !== "") {
    return (
      <>
        {datavalue.map((items, index) => (
          <div
            key={index}
            className="app-visit-details-item"
            onClick={() => {
              onClickDetail(items.MonthName);
            }}
          >
            <div className="app-details-item-header">
              <h4>
                {items.MonthName} - {P_YEAR}
              </h4>
            </div>
            <div className="app-details-item-details">
              <div>
                <label className="txtheader">Visit Planned :</label>
                <label className="txtvalue">{items.VisitPlanned}</label>
              </div>
              <div>
                <label className="txtheader">Visit Completed :</label>
                <label className="txtvalue">{items.VisitCompleted}</label>
              </div>
              <br />
              <div>
                <label className="txtheader">Samples Requested :</label>
                <label className="txtvalue">{items.SamplesRequested}</label>
              </div>
              <div>
                <label className="txtheader">Quotations Created :</label>
                <label className="txtvalue">{items.QuotationsCreated}</label>
              </div>
              <div>
                <label className="txtheader">Quotaion to Sale :</label>
                <label className="txtvalue">N/A</label>
              </div>
              <br />
              <div>
                <label className="txtheader">Net Items :</label>
                <label className="txtvalue">{items.NetItems}</label>
              </div>
              <div>
                <label className="txtheader">New Items :</label>
                <label className="txtvalue">N/A</label>
              </div>
              <br />
              <div>
                <label className="txtheader">Loss Items :</label>
                <label className="txtvalue">N/A</label>
              </div>
              <div>
                <label className="txtheader">Loss Recovered :</label>
                <label className="txtvalue">N/A</label>
              </div>
              <div>
                <label className="txtheader">Accumlated Loss Items :</label>
                <label className="txtvalue">N/A</label>
              </div>

              <br />
              <div>
                <label className="txtheader">Monthly Sale :</label>
                <label className="txtvalue">{items.MonthlySale}</label>
              </div>
              <div>
                <label className="txtheader">Monthly Target :</label>
                <label className="txtvalue">N/A</label>
              </div>

              <br />
            </div>
          </div>
        ))}
      </>
    );
  }
}

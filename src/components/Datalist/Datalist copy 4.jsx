import "./Datalist.css";
import React, { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import loader from "../../components/assets/img/loader.gif";

export default function Datalist(props) {
  const { P_YEAR, P_USER } = props;
  const [datavalue, setDatavalue] = useState([]);
  const [myArray, setMyArray] = useState([]);

  const addObjectToArray = (newObject) => {
    setMyArray((prevArray) => [...prevArray, newObject]);
  };

  const dataReturn = [];
  const [getValue, setValue] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [getGET_QUOTATION_DETAIL, setGET_QUOTATION_DETAIL] = useState([]);
  const [getGET_VISITATION_DETAIL, setGET_VISITATION_DETAIL] = useState([]);
  const [getGET_SAMPLE_REQUEST, setGET_SAMPLE_REQUEST] = useState([]);
  const [getGET_TOTAL_SALES, setGET_TOTAL_SALES] = useState([]);

  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_QUOTATION_DETAIL = API_URL_WS_SALES_PLAN + "GET_QUOTATION_DETAIL";
  const GET_VISITATION_DETAIL = API_URL_WS_SALES_PLAN + "GET_VISITATION_DETAIL";
  const GET_SAMPLE_REQUEST_DETAIL =
    API_URL_WS_SALES_PLAN + "GET_SAMPLE_REQUEST_DETAIL";
  const GET_TOTAL_SALES = API_URL_WS_SALES_PLAN + "GET_TOTAL_SALES";

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
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);
    const fdata = formdata;

    const fetchAPIs = async () => {
      const [api1Response, api2Response, api3Response, api4Response] =
        await Promise.all([
          callAPI(GET_QUOTATION_DETAIL, fdata),
          callAPI(GET_VISITATION_DETAIL, fdata),
          callAPI(GET_SAMPLE_REQUEST_DETAIL, fdata),
          callAPI(GET_TOTAL_SALES, fdata),
        ]);

      const api1Value = api1Response.result;
      const api2Value = api2Response.result;
      const api3Value = api3Response.result;
      const api4Value = api4Response.result;

      setGET_QUOTATION_DETAIL(api1Value);
      setGET_VISITATION_DETAIL(api2Value);
      setGET_SAMPLE_REQUEST(api3Value);
      setGET_TOTAL_SALES(api4Value);
      Caltest();
    };

    fetchAPIs();
  }, [P_YEAR, P_USER ]);

  function Caltest() {
    setMyArray([]);
    for (let iMonth = 1; iMonth <= 12; iMonth++) {
      let MonthName = getMonthName(iMonth);
      let customerListMonthWise = getGET_VISITATION_DETAIL.filter((row) =>
        row.PLAN_DATETIME.includes(MonthName)
      );
      let uniqueCustomer = [
        ...new Set(customerListMonthWise.map((item) => item.CUST_CODE)),
      ];

      let repeatCustomer = 0;
      uniqueCustomer.forEach((uc) => {
        let customerRows = customerListMonthWise.filter(
          (row) => row.CUST_CODE === uc
        );
        if (customerRows.length > 1) {
          repeatCustomer += 1;
        }
      });

      let VisitPlanned = getGET_VISITATION_DETAIL.filter((row) =>
        row.PLAN_DATETIME.includes(MonthName)
      );

      let VisitCompleted = getGET_VISITATION_DETAIL
        .filter((row) => row.PLAN_DATETIME.includes(MonthName))
        .filter((row) => row.CHECK_OUT_DATE !== "");

      let SamplesRequested = getGET_SAMPLE_REQUEST.filter((row) =>
        row.INV_DATE.includes(MonthName)
      );

      let valueQUOTATION = getGET_QUOTATION_DETAIL
        .filter((row) => row.DOC_DATE.includes(MonthName))
        .filter((row) => row.QUOTATION_SALES === "Y");

      let QuotaiontoSale = 0;
      let sumvalueQUOTATION = valueQUOTATION.map(
        (items, index) => (QuotaiontoSale += Number(items.TOTAL_SALES))
      );

      let valueGET_TOTAL_SALES = getGET_TOTAL_SALES
        .filter((row) => row.MONTH.includes(iMonth))
        .map((items, index) => {
          return items.TOTAL;
        });

      let TotalSales = 0;
      valueGET_TOTAL_SALES.forEach((tt) => {
        TotalSales = Number(tt);
      });

      const newItem = {
        P_USER: P_USER,
        P_YEAR: P_YEAR,
        MonthName: MonthName,
        VisitPlanned: VisitPlanned.length,
        VisitCompleted: VisitCompleted.length,
        CustomersPlanned: uniqueCustomer.length,
        Repeatingcustomers: repeatCustomer,
        SamplesRequested: SamplesRequested.length,
        QuotationsCreated: valueQUOTATION.length,
        QuotaiontoSale: QuotaiontoSale,
        TotalSales: TotalSales,
        // iMonth: iMonth,
      };

      console.log(newItem);

      // addObjectToArray(newItem);

      // console.log(myArray);

      dataReturn.push({
        P_USER: P_USER,
        P_YEAR: P_YEAR,
        iMonth: iMonth,
        MonthName: MonthName,
        VisitPlanned: VisitPlanned.length,
        VisitCompleted: VisitCompleted.length,
        CustomersPlanned: uniqueCustomer.length,
        Repeatingcustomers: repeatCustomer,
        SamplesRequested: SamplesRequested.length,
        QuotationsCreated: valueQUOTATION.length,
        QuotaiontoSale: QuotaiontoSale,
        TotalSales: TotalSales,
      });
    }

    //console.log(myArray);
    setDatavalue(dataReturn);
    setIsLoaded(true);
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
  } else {
    // return <>{getValue}</>;
    return (
      <>
        {datavalue.map((items, index) => (
          <div className="app-details-item">
            <div className="app-details-item-header">
              <h4>
                {items.MonthName} - {P_YEAR} - {P_USER}
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
                <label className="txtheader">Customers Planned :</label>
                <label className="txtvalue">{items.CustomersPlanned}</label>
              </div>
              <div>
                <label className="txtheader">Repeating customers :</label>
                <label className="txtvalue">{items.Repeatingcustomers}</label>
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
                <label className="txtvalue">{items.QuotaiontoSale}</label>
              </div>

              <br />
              <div>
                <label className="txtheader">Total Sales :</label>
                <label className="txtvalue">{items.TotalSales}</label>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

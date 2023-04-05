import "./Datalist.css";
import React, { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import loader from "../../components/assets/img/loader.gif";

export default function Datalist(props) {
  const { product, P_YEAR, P_USER } = props;
  // console.log("***" + P_YEAR + "***" + P_USER + "***");

  const YEAR = P_YEAR.substring(2, 4);
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_DETAIL_BY_MONTH = API_URL_WS_SALES_PLAN + "GET_DETAIL_BY_MONTH";
  const GET_VISITATION_DETAIL = API_URL_WS_SALES_PLAN + "GET_VISITATION_DETAIL";
  const [apiResponse, setApiResponse] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  var dataReturn = [
    { month: 1 },
    { month: 2 },
    { month: 3 },
    { month: 4 },
    { month: 5 },
    { month: 6 },
    { month: 7 },
    { month: 8 },
    { month: 9 },
    { month: 10 },
    { month: 11 },
    { month: 12 },
  ];

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
    callMyApi();
  }, [props]);

  function callMyApi() {
    console.log(dataReturn);
    console.log(P_USER + "-" + P_YEAR);
    var formdata = new FormData();
    const endpoint = GET_VISITATION_DETAIL;
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);

    const data = formdata;
    callAPI(endpoint, data)
      .then((response) => {
        //console.log("callMyApi ->  ", response.result);
        //const uniqueCustomer = [...new Set(response.result.map(item => item.CUST_CODE))];
        //const uniqueCustomer = [...new Set(response.result.map(item => { return response.result.find(obj => obj.PLAN_DATETIME.includes(MonthName)) }))];
        //const uniqueCustomer = [...new Set(return response.result.find(obj => obj.PLAN_DATETIME.includes(MonthName))];

        //Month Loop
        for (let iMonth = 1; iMonth <= 12; iMonth++) {
          let MonthName = getMonthName(iMonth);

          let customerListMonthWise = response.result.filter((row) =>
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

          console.log("uniqueCustomer ", MonthName, " -> ", uniqueCustomer);
          console.log("repeatCustomer ", MonthName, " -> ", repeatCustomer);

          dataReturn.forEach(function (item, index) {
            if (item.month === iMonth) {
              item.uniqueCustomer = uniqueCustomer.length;
              item.repeatCustomer = repeatCustomer;
            }
          });
        }
      })
      .then(
        (data) => {
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
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
    if (dataReturn.length !== 0) {
      return (
        <>
          {dataReturn.map((items, index) => (
            <div className="app-details-item">
              <div className="app-details-item-header">
                <h4>{/* {product.title} {P_YEAR} */}</h4>
              </div>
              <div className="app-details-item-details">
                <div>
                  <label className="txtheader">Visit Planned :</label>
                  <label className="txtvalue">{items.repeatCustomer}</label>
                </div>
                <div>
                  <label className="txtheader">Visit Completed :</label>
                  <label className="txtvalue">{items.repeatCustomer}</label>
                </div>
                <br />
                <div>
                  <label className="txtheader">Customers Planned :</label>
                </div>
                <div>
                  <label className="txtheader">Repeating customers :</label>
                </div>

                <br />

                <div>
                  <label className="txtheader">Samples Requested :</label>
                  <label className="txtvalue">{items.repeatCustomer}</label>
                </div>
                <div>
                  <label className="txtheader">Quotations Created :</label>
                  <label className="txtvalue">{items.repeatCustomer}</label>
                </div>
                <div>
                  <label className="txtheader">Quotaion to Sale :</label>
                  <label className="txtvalue">{items.repeatCustomer}</label>
                </div>

                <br />
                <div>
                  <label className="txtheader">Total Sales :</label>
                  <label className="txtvalue">{items.repeatCustomer}</label>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return <></>;
    }
  }
}

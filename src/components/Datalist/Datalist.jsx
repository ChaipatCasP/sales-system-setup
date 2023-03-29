import "./Datalist.css";
import React, { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import loader from "../../components/assets/img/loader.gif";

export default function Datalist(props) {
  const { product, P_YEAR, P_USER } = props;
  // console.log("***" + P_YEAR + "***" + P_USER + "***");

  const YEAR = P_YEAR.substring(2, 4);
  const month = product.month + "-" + YEAR;
  const P_MONTH = product.monthID;
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_DETAIL_BY_MONTH = API_URL_WS_SALES_PLAN + "GET_DETAIL_BY_MONTH";
  const [apiResponse, setApiResponse] = useState([]);
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

  useEffect(() => {
    setIsLoaded(false);
    FN_GET_DETAIL_BY_MONTH();
  }, [props]);

  function FN_GET_DETAIL_BY_MONTH() {
    var formdata = new FormData();
    const endpoint = GET_DETAIL_BY_MONTH;
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);
    formdata.append("P_MONTH", P_MONTH);

    const data = formdata;
    callAPI(endpoint, data)
      .then((response) => {
        setApiResponse(response.result);
        console.log(response.result);
      })
      .then(
        (data) => {
          // console.log(response.result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    // console.log("-----------------------");
    // for (const [key, value] of data) {
    //   console.log(key + ":" + value);
    // }
    // console.log("FN_GET_QUOTATION_DETAIL");
  }

  // const filterItemsHandler = (key) => {
  //   const filteredItems = apiResponse
  //     .filter((product) => {
  //       return product.DOC_DATE.substring(3, 9) === key;
  //     })
  //     .map((tattoo, index) => {
  //       return tattoo.TOTAL_SALES;
  //     });
  //   return { filteredItems };
  // };

  // var Quotaion_to_Sale = 0;
  // var Quotations_Created = 0;

  // filterItemsHandler(month).filteredItems.map(
  //   (items, index) => (Quotaion_to_Sale += Number(items))
  // );

  // Quotations_Created = filterItemsHandler(month).filteredItems.length;

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
    if (apiResponse.length !== 0) {
      return (
        <>
          {apiResponse.map((items, index) => (
            <div className="app-details-item">
              <div className="app-details-item-header">
                <h4>
                  {product.title} {P_YEAR}
                </h4>
              </div>
              <div className="app-details-item-details">
                <div>
                  <label className="txtheader">Visit Planned :</label>
                  <label className="txtvalue">{items.VISITPLANNED}</label>
                </div>
                <div>
                  <label className="txtheader">Visit Completed :</label>
                  <label className="txtvalue">{items.VISITCOMPLETED}</label>
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
                  <label className="txtvalue">{items.SAMPLESREQUESTED}</label>
                </div>
                <div>
                  <label className="txtheader">Quotations Created :</label>
                  <label className="txtvalue">{items.QUOTATIONCREATED}</label>
                </div>
                <div>
                  <label className="txtheader">Quotaion to Sale :</label>
                  <label className="txtvalue">{items.QUOTATIONTOSALE}</label>
                </div>

                <br />
                <div>
                  <label className="txtheader">Total Sales :</label>
                  <label className="txtvalue">{items.TOTALSALES}</label>
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

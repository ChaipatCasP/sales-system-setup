import "./Datalist.css";
import React, { useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import loader from "../../components/assets/img/loader.gif";
import productslist from "../../Data";

export default function Datalist(props) {
  const { P_YEAR, P_USER } = props;
  // console.log("***" + P_YEAR + "***" + P_USER + "***");

  const YEAR = P_YEAR.substring(2, 4);
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_QUOTATION_DETAIL = API_URL_WS_SALES_PLAN + "GET_QUOTATION_DETAIL";

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
    FN_GET_QUOTATION_DETAIL();
  }, [props]);

  function FN_GET_QUOTATION_DETAIL() {
    var formdata = new FormData();
    const endpoint = GET_QUOTATION_DETAIL;
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);

    const data = formdata;
    callAPI(endpoint, data)
      .then((response) => {
        setApiResponse(response.result);
      })
      .then(
        (data) => {
          setIsLoaded(true);
          TESTCALL();
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    // console.log("-----------------------");
    for (const [key, value] of data) {
      console.log(key + ":" + value);
    }
    console.log("FN_GET_QUOTATION_DETAIL");
  }

  const [apiRes, setApiRes] = useState([]);

  function TESTCALL() {
    productslist.map((product, index) => {
      var KET_DOC = product.month + "-" + YEAR;

      const datares = apiResponse.filter((res) => {
        return res.DOC_DATE.substring(3, 9) === KET_DOC;
      });
      console.log(datares);
      setApiRes(datares);
    });

  }

  // const PlannedElements = productslist.map((product, index) => {
  //   var KET_DOC = product.month + "-" + YEAR;

  //   const filteredItems = apiResponse
  //     .filter((res) => {
  //       return res.DOC_DATE.substring(3, 9) === KET_DOC;
  //     })
  //     .map((tattoo, index) => {
  //       return tattoo.TOTAL_SALES;
  //     });
  //   return { filteredItems };
  // });

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
      <div class="container">
        <div class="row">
          <div class="col-12">
            <img className="loaderImage" src={loader} alt="loader" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {productslist.map((items, index) => (
          <div className="app-details-item">
            <div className="app-details-item-header">
              <h4>{/* {product.title} {YEAR} ( {P_USER} - {P_YEAR} ) */}</h4>
              
            </div>
            <div className="app-details-item-details">
              <div>Visit Planned : </div>
              <div>Visit Completed : </div>

              <br />

              <div>Customers Planned : </div>
              <div>Repeating customers : </div>

              <br />

              <div>Samples Requested : </div>
              {/* <div>
              Quotations Created :{" "}
              <label className="txtvalue">{Quotations_Created}</label>
            </div>
            <div>
              Quotaion to Sale :{" "}
              <label className="txtvalue">{Quotaion_to_Sale}</label>
            </div> */}

              <br />

              <div>Total Sales : </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

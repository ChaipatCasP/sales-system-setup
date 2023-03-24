import React, { useEffect, useState } from "react";
import "./Products.css";
import { environment } from "../../environment/environment";
export default function Products(props) {
  var P_USER = "F2304";
  var tattooval = "JAN";
  const { product, P_YEAR } = props;
  const YEAR = P_YEAR.substring(2, 4);
  const API_URL_WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_QUOTATION_DETAIL = API_URL_WS_SALES_PLAN + "GET_QUOTATION_DETAIL";

  const [apiResponse, setApiResponse] = useState([]);
  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  useEffect(() => {
    FN_GET_QUOTATION_DETAIL();
  }, []);

  function FN_GET_QUOTATION_DETAIL() {
    var formdata = new FormData();
    const endpoint = GET_QUOTATION_DETAIL;
    formdata.append("P_COM", "JB");
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_YEAR", P_YEAR);

    const data = formdata;
    callAPI(endpoint, data).then((response) => {
      setApiResponse(response.result);
      // console.log(response.result);
    });
  }
  return (
    <div className="app-products-item">
      <div className="app-products-item-header">
        <h4>{product.title + YEAR}</h4>
      </div>
      <div className="app-products-item-details">
        <div>Visit Planned : {product.price}</div>
        <div>Visit Completed : {product.price}</div>

        <br />

        <div>Customers Planned : {product.price}</div>
        <div>Repeating customers : {product.price}</div>

        <br />

        <div>Samples Requested : {product.price}</div>
        <div>Quotations Created :{product.price}</div>
        <div>Quotaion to Sale : {product.price}</div>

        <br />

        <div>Total Sales : {product.image} </div>
      </div>
    </div>
  );
}

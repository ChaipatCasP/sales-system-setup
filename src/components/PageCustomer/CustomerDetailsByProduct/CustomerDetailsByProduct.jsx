import { environment } from "../../../environment/environment";
import React, { useEffect, useState } from "react";
import "./CustomerDetailsByProduct.css";
import loader from "../../../components/assets/img/loader.gif";

export default function CustomerDetailsByProduct(props) {
  const { mtName, location, RID, P_YEAR } = props;
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const WS_SALES_PLAN = environment.baseUrl + "apip/WS_SALES_PLAN/";
  const GET_PRODUCTS = WS_SALES_PLAN + "GET_PRODUCTS_BY_SALES_PLAN_RID";
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [txtmtName, setmtName] = useState("");
  const [txtlocation, setlocation] = useState("");

  async function callAPI(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      redirect: "follow",
    });
    return await response.json();
  }

  useEffect(() => {
    setGET_PRODUCTS([]);
    setmtName("");
    setlocation("");
  }, [P_YEAR]);

  const [getGET_PRODUCTS, setGET_PRODUCTS] = useState([]);
  useEffect(() => {
    setmtName(mtName);
    setlocation(location);
    setIsLoaded(false);
    var formdata = new FormData();
    formdata.append("P_COM", P_COM);
    formdata.append("P_USER", P_USER);
    formdata.append("P_KEY", "");
    formdata.append("P_SALES_PLAN_RID", RID);

    const fdata = formdata;

    const fetchAPIs = async () => {
      const [api1Response] = await Promise.all([callAPI(GET_PRODUCTS, fdata)]);

      const api1Value = api1Response.result;
      setGET_PRODUCTS(api1Value);
      setIsLoaded(true);
    };

    if (RID !== "") {
      fetchAPIs();
    } else {
      setGET_PRODUCTS([]);
      setIsLoaded(true);
    }
  }, [RID]);

  const underline = {
    textDecorationLine: "underline",
  };

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
  } else if (getGET_PRODUCTS.length === 0) {
    return (
      <>
        <div className="app-content-page-cus-right-header">
          <label
            style={{ float: "right", fontSize: "20px", paddingRight: "20px" }}
          >
            Details
          </label>
        </div>
        <br style={{ border: "solid", lineHeight: "2em" }} />

        <div
          className="right-items"
          style={{
            borderColor: "#dee2f2",
            border: "solid",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            paddingTop: "10px",
          }}
        ></div>
        <div className="" style={{ paddingLeft: "5px", paddingTop: "10px" }}>
          <label>Meeting with :</label> <label>{txtmtName}</label>
          <br />
          <label>Location :</label> <label>{txtlocation}</label>
        </div>

        <div className="app-content-page-cus-right-header">
          <label
            style={{ float: "right", fontSize: "20px", paddingRight: "20px" }}
          >
            Offerings
          </label>
        </div>
        <br style={{ border: "solid", lineHeight: "2em" }} />

        <div
          className="right-items"
          style={{
            borderColor: "#dee2f2",
            border: "solid",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            paddingTop: "10px",
          }}
        ></div>
        <div className="" style={{ paddingLeft: "5px", paddingTop: "10px" }}>
          <label>No Offerings</label>
        </div>
      </>
    );
  } else if (getGET_PRODUCTS.length > 0) {
    return (
      <>
        <div className="app-content-page-cus-right-header">
          <label
            style={{ float: "right", fontSize: "20px", paddingRight: "20px" }}
          >
            Details
          </label>
        </div>
        <br style={{ border: "solid", lineHeight: "2em" }} />

        <div
          className="right-items"
          style={{
            borderColor: "#dee2f2",
            border: "solid",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            paddingTop: "10px",
          }}
        ></div>
        <div className="" style={{ paddingLeft: "5px", paddingTop: "10px" }}>
          <label>Meeting with :</label> <label>{txtmtName}</label>
          <br />
          <label>Location :</label> <label>{txtlocation}</label>
        </div>

        <div className="app-content-page-cus-right-header">
          <label
            style={{ float: "right", fontSize: "20px", paddingRight: "20px" }}
          >
            Offerings
          </label>
        </div>
        <br style={{ border: "solid", lineHeight: "2em" }} />

        <div
          className="right-items"
          style={{
            borderColor: "#dee2f2",
            border: "solid",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            paddingTop: "10px",
          }}
        ></div>
        <div className="" style={{ paddingLeft: "5px", paddingTop: "10px" }}>
          {getGET_PRODUCTS.map((items, index) => (
            <div className="items-offerings" key={index}>
              <div>
                <label className="items-offerings-index">{index + 1}</label>
              </div>

              <div className="items-offerings-details">
                <label>Group : </label>{" "}
                <label style={underline}>{items.GROUP_NAME}</label> &gt;&gt;
                <label>Sub-Group : </label>
                <label style={underline}>{items.SUB_GROUP_NAME}</label> &gt;&gt;
                <label>Category : </label>
                <label style={underline}>{items.CATEGORY_NAME}</label>
                <br />
                <br />
                <label>
                  {items.PRODUCT_CODE} | {items.PRODUCT_NAME}
                </label>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

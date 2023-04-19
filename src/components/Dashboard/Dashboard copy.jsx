import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";

import { TableRow } from "react-data-table-component";

export default function Dashboard() {
  const navigate = useNavigate();
  const [xxx, setXxx] = useState("");
  const P_COM = localStorage.getItem("P_COM");
  const P_USER = localStorage.getItem("P_USER");
  const P_NAME = localStorage.getItem("P_NAME");

  useEffect(() => {
    if (P_COM === "" || P_USER === "" || P_NAME === "") {
      navigate("/PageStaff");
    }
  });
  //********************************************************************//

  const data = [
    {
      id: 1,
      title: "Conan the Barbarian",
      year: "1982",
      SINO: "N/A",
      Customer: "N/A",
      Staff: "N/A",
      Visits: "N/A",
      NetProducts: "N/A",
    },
    {
      id: 2,
      title: "The Terminator",
      year: "1984",
      SINO: "N/A",
      Customer: "N/A",
      Staff: "N/A",
      Visits: "N/A",
      NetProducts: "N/A",
    },
    {
      id: 3,
      title: "X-Men: Days of Future Past",
      year: "2014",
      SINO: "N/A",
      Customer: "N/A",
      Staff: "N/A",
      Visits: "N/A",
      NetProducts: "N/A",
    },
  ];

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Year",
      selector: "year",
      sortable: true,
    },
    {
      name: "SI.No.",
      selector: "SINO",
      sortable: true,
    },
    {
      name: "Customer",
      selector: "Customer",
      sortable: true,
    },
    {
      name: "Staff",
      selector: "Staff",
      sortable: true,
    },
    {
      name: "Visits",
      selector: "Visits",
      sortable: true,
    },
    {
      name: "Net Products",
      selector: "NetProducts",
      sortable: true,
    },
  ];

  const Table = () => {
    return (
      <table>
        <colgroup>
          <col />
          <col span="2" />
          <col span="2" />
        </colgroup>
        <thead>
          <tr>
            <th> </th>
            <th colSpan="2">Group 1</th>
            <th colSpan="2">Group 2</th>
          </tr>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product 1</td>
            <td>$10</td>
            <td>5%</td>
            <td>$12</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>Product 2</td>
            <td>$20</td>
            <td>10%</td>
            <td>$25</td>
            <td>15%</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <Table />

    /* <DataTable
        title="Movie List"
        columns={columns}
        data={data}
        // sortIcon={<i className="fa fa-fw fa-sort" />}
        defaultSortField="title"
        pagination
        highlightOnHover
      /> */

    // <table>
    //   <thead>
    //     <tr>
    //       <th rowSpan="2">SI.No.</th>
    //       <th rowSpan="2">Customer</th>
    //       <th rowSpan="2">Staff</th>
    //       <th rowSpan="2">Visits</th>
    //       <th
    //         colSpan="3"
    //         style={{
    //           border: "solid",
    //           borderRight: "none",
    //           borderLeft: "none",
    //           borderTop: "none",
    //         }}
    //       >
    //         {" "}
    //         Net Product
    //       </th>
    //       <th rowSpan="2">Closed</th>
    //       <th rowSpan="2">Loss</th>
    //       <th
    //         colSpan="3"
    //         style={{
    //           border: "solid",
    //           borderRight: "none",
    //           borderLeft: "none",
    //           borderTop: "none",
    //         }}
    //       >
    //         Sales
    //       </th>
    //     </tr>

    //     <tr>
    //       <th>Jan 23</th>
    //       <th>Feb 23</th>
    //       <th>Mar 23</th>
    //       <th>Jan 23</th>
    //       <th>Feb 23</th>
    //       <th>Mar 23</th>
    //     </tr>
    //   </thead>

    //   <tbody>
    //     <tr>
    //       <td className="tdcenter">1</td>
    //       <td>CH110-Manis</td>
    //       <td>F1123 - Kiraporn</td>
    //       <td className="tdcenter">15</td>
    //       <td className="tdcenter">20</td>
    //       <td className="tdcenter">21</td>
    //       <td className="tdcenter" style={{ color: "red" }}>
    //         19
    //       </td>
    //       <td className="tdcenter">19</td>
    //       <td className="tdcenter">19</td>
    //       <td className="tdcenter">1.2M</td>
    //       <td className="tdcenter">1.8M</td>
    //       <td className="tdcenter">1.4M</td>
    //     </tr>
    //   </tbody>
    // </table>
  );
}

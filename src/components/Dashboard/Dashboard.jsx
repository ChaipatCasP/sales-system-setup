import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    { id: 1, name: "John", age: 28 },
    { id: 2, name: "Jane", age: 32 },
    { id: 3, name: "Bob", age: 24 },
  ];

  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.age}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th rowSpan="2">SI.No.</th>
          <th rowSpan="2">Customer</th>
          <th rowSpan="2">Staff</th>
          <th rowSpan="2">Visits</th>
          <th
            colSpan="3"
            style={{
              border: "solid",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
          >
            {" "}
            Net Product
          </th>
          <th rowSpan="2">Closed</th>
          <th rowSpan="2">Loss</th>
          <th
            colSpan="3"
            style={{
              border: "solid",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
            }}
          >
            Sales
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
        <tr>
          <td className="tdcenter">1</td>
          <td>CH110-Manis</td>
          <td>F1123 - Kiraporn</td>
          <td className="tdcenter">15</td>
          <td className="tdcenter">20</td>
          <td className="tdcenter">21</td>
          <td className="tdcenter" style={{ color: "red" }}>
            19
          </td>
          <td className="tdcenter">19</td>
          <td className="tdcenter">19</td>
          <td className="tdcenter">1.2M</td>
          <td className="tdcenter">1.8M</td>
          <td className="tdcenter">1.4M</td>
        </tr>
      </tbody>
    </table>
  );
}

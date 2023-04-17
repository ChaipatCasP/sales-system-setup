import './DropDownYear.css'
export default function DropDownYear(props) {
  const { onMonthChange } = props;
  const P_YEAR = localStorage.getItem("P_YEAR");

  return (
    <>
      <select
        className="dropdown-month"
        onChange={(event) => onMonthChange(event.target.value)}
      >
        <option className="dropdown-option" value={""}>
          ALL MONTH IN {P_YEAR}
        </option>
        <option className="dropdown-option" value={"JAN"}>
          JAN - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"FEB"}>
          FEB - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"MAR"}>
          MAR - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"APR"}>
          APR - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"MAY"}>
          MAY - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"JUN"}>
          JUN - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"JUL"}>
          JUL - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"AUG"}>
          AUG - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"SEP"}>
          SEP - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"OCT"}>
          OCT - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"NOV"}>
          NOV - {P_YEAR}
        </option>
        <option className="dropdown-option" value={"DEC"}>
          DEC - {P_YEAR}
        </option>
      </select>
    </>
  );
}

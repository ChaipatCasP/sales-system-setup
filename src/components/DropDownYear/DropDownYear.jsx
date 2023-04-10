export default function DropDownYear(props) {
  const { onMonthChange } = props;

  return (
    <>
      <select
        className="dropdown-year"
        onChange={(event) => onMonthChange(event.target.value)}
      >
        <option className="dropdown-option" value={""}>
          ALL MONTH
        </option>
        <option className="dropdown-option" value={"JAN"}>
          JAN
        </option>
        <option className="dropdown-option" value={"FEB"}>
          FEB
        </option>
        <option className="dropdown-option" value={"MAR"}>
          MAR
        </option>
        <option className="dropdown-option" value={"APR"}>
          APR
        </option>
        <option className="dropdown-option" value={"MAY"}>
          MAY
        </option>
        <option className="dropdown-option" value={"JUN"}>
          JUN
        </option>
        <option className="dropdown-option" value={"JUL"}>
          JUL
        </option>
        <option className="dropdown-option" value={"AUG"}>
          AUG
        </option>
        <option className="dropdown-option" value={"SEP"}>
          SEP
        </option>
        <option className="dropdown-option" value={"OCT"}>
          OCT
        </option>
        <option className="dropdown-option" value={"NOV"}>
          NOV
        </option>
        <option className="dropdown-option" value={"DEC"}>
          DEC
        </option>
      </select>
    </>
  );
}

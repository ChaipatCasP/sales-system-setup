import "./StaffInformation.css";

export default function StaffInformation(props) {
  const { staff ,onStaffClick } = props;
  return (
    <div className="app-information">
      <div className="app-information-header">
        <div className="app-information-header-circle">
          <div class="circle" onClick={() => {onStaffClick(staff.STAFF_NAME)}}></div>
        </div>

        <div className="app-information-header-details">
          <div>{staff.STAFF_CODE}</div>
          <div>{staff.STAFF_NAME}</div>
        </div>
      </div>

      <div className="app-content-main-details">
        <div>Total Customers :NODATA</div>
        <div>Planned Customers :NODATA</div>
        <br />
        <div>Visit Planned : NODATA</div>
        <div>Visit Completed : NODATA</div>
        <br />
        <div>
          Sample Requested : NODATA THB | NODATA Customer
        </div>
        <div>
          Quotation Created : NODATA | NODATA Customer
        </div>
        <br />
        <div>
          Total Sales : NODATA THB | NODATA Customer
        </div>
      </div>
    </div>
  );
}

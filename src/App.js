import "./App.css";
import { Navigate, useRoutes } from "react-router-dom";
import Products from "./components/Products/Products";
import StaffInformation from "./components/Infomation/StaffInformation";
import productslist from "./Data";
import Services from "./components/Shared/services/Services";
function App() {

function onStaffClick(text) {
  alert(text);
}

  const productsElements = productslist.map((product, index) => {
    return <Products key={index} product={product}/>;
  });

  // const staffElements = productslist.map((staff, index) => {
  //   return <StaffInformation key={index} staff={staff} onStaffClick={onStaffClick}/>;
  // });


  return (
    <div className="app">

      <div className="app-header">
        <header className=" header">
          <nav className="nav"></nav>
        </header>
      </div>
      <section className="app-section"></section>
      <section className="app-container"></section>

      <div className="app-content">
        <div className="app-content-main">
          <Services  P_COM={'JB'} P_USER={'JBT04'} P_SALES_CHANNEL_CODE={'U'} txtfunc={'GET_SALES_LIST'}/>
        </div>

        <div className="app-content-box">{productsElements}</div>
      </div>
    </div>
  );
}

export default App;

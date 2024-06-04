import { Outlet } from "react-router-dom";
import ManageNavMenu from "../../../Components/nav/manageNavMenu/ManageNavMenu";

function Manage() {
  return (
    <>
      <h1>Manage your account</h1>

      <div>
        <h2>Change your account settings</h2>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <ManageNavMenu />
          </div>
          <div className="col-md-9"></div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Manage;

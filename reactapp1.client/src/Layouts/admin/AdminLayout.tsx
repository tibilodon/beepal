import styles from "./adminLayout.module.css";
import { Outlet } from "react-router-dom";
import AdminNav from "../../Components/nav/admin/AdminNav";

function AdminLayout() {
  return (
    <>
      <div>
        <AdminNav />
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;

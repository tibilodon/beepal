import "./manageNavMenu.css"
import {  NavLink } from "react-router-dom"
function ManageNavMenu() {
    return (
        <>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <NavLink to={"/account/manage"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
                   Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    {/*<Link className="nav-link" to={"/Account/Manage/Email"}>Email</Link>*/}
                    <NavLink to={"/account/manage/email"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                     Email
                    </NavLink>
                </li>
                <li className="nav-item">
                    {/*  <Link className="nav-link" to={"/Account/Manage/ChangePassword"}>Password</Link>*/}
                    <NavLink to={"/account/manage/changePassword"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                     Password
                    </NavLink>
                </li>
                <li className="nav-item">
                    {/*   <Link className="nav-link" to={"/Account/Manage/PersonalData"}>Personal data</Link>*/}
                    <NavLink to={"/account/manage/personalData"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                     Personal Data
                    </NavLink>
                </li>
            </ul>
        </>
    );
}

export default ManageNavMenu;
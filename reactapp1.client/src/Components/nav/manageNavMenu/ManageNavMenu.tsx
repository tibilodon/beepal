import styles from "./manageNavMenu.module.css"
import { NavLink } from "react-router-dom"
function ManageNavMenu() {
    return (
        <>
            <nav className={styles.wrap}>
                <ul >
                    <li className="">
                        <NavLink to={"/account/manage"} className={({ isActive }) => isActive ? "navLinkManage manageActive" : "navLinkManage"} end>
                            Profilom
                        </NavLink>
                    </li>
                    <li className="">
                        {/*<Link className="navLinkManage manage" to={"/Account/Manage/Email"}>Email</Link>*/}
                        <NavLink to={"/account/manage/email"} className={({ isActive }) => isActive ? "navLinkManage manageActive" : "navLinkManage"}>
                            E-mail
                        </NavLink>
                    </li>
                    <li className="">
                        {/*  <Link className="navLinkManage manage" to={"/Account/Manage/ChangePassword"}>Password</Link>*/}
                        <NavLink to={"/account/manage/changePassword"} className={({ isActive }) => isActive ? "navLinkManage manageActive" : "navLinkManage"}>
                            Jelszó
                        </NavLink>
                    </li>
                    <li className="">
                        {/*   <Link className="navLinkManage manage" to={"/Account/Manage/PersonalData"}>Personal data</Link>*/}
                        <NavLink to={"/account/manage/personalData"} className={({ isActive }) => isActive ? "navLinkManage manageActive" : "navLinkManage"}>
                            Adataim
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default ManageNavMenu;
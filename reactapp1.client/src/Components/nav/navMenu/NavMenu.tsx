import styles from "./navMenu.module.css"

import { NavLink,  Link } from "react-router-dom"




import menuIcon from "../../../assets/icons/menu.svg"
import cart from "../../../assets/icons/cart.svg"
import logo from "../../../assets/images/logo.png"


import close from "../../../assets/icons/close.svg";

import { useAppProvider } from "../../../Context/AppContext";
import ManageUser from "../../popup/ManageUser/ManageUser"
import PublicRoute from "../../utils/PublicRoute"
import Loader from "../../Loader/Loader"

function NavMenu() {
    const {  sideNav, setSideNav,  setShowLogin,setShowRegister,setShowForgotPassword, resetShowStates } = useAppProvider();



    const handleLogin = () => {
        setSideNav(false);
        setShowForgotPassword(false);
        setShowRegister(false);
        setShowLogin(true);
    };

    return (
        <>
            

            <nav className={styles.navbar}>
                <img className={styles.navIcon} onClick={() => setSideNav(!sideNav)} src={menuIcon}></img>
                <Link onClick={ resetShowStates} to={"/"}>
                    <img className={styles.logo} src={logo}>
                    </img>
                </Link>
                <div className={ styles.user}>
        
                <ManageUser/>
                <img className={styles.navIcon} src={cart}></img>
                </div>
            </nav>

            <div className={styles.sideNav} style={{ width: `${sideNav ? "210px" : "0"}` }}>
                <button onClick={() => setSideNav(!sideNav)} className={styles.closebtn}>
                    <img className={styles.navIcon} src={close}></img>
                </button>
                <section className={styles.navLinks}>
                    <div className="">
                        <NavLink onClick={() => setSideNav(!sideNav)} to={"/"} className={({ isActive }) => isActive ? "navLinkMain active" : "navLinkMain"}>
                            <span className="" aria-hidden="true"></span> Home
                        </NavLink>
                    </div>

                 

                    <PublicRoute>
                        <span className={styles.loginBtn} onClick={handleLogin} aria-hidden="true">
                            Belépés
                        </span>
                    </PublicRoute>

                </section>
                <div className={styles.gimmick}>
                    <Loader />
                </div>
            </div>


        </>

    );
}

export default NavMenu;
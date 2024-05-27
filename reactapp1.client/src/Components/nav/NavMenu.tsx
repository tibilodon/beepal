import styles from "./navMenu.module.css"
import ProtectedRoute from '../utils/ProtectedRoute';
import { NavLink, useNavigate, Link } from "react-router-dom"
import { useAppProvider } from "../../Context/AppContext"
import PublicRoute from '../utils/PublicRoute';

import menuIcon from "../../assets/icons/menu.svg"
import cart from "../../assets/icons/cart.svg"
import logo from "../../assets/images/logo.png"
import Loader from "../Loader/Loader";

import close from "../../assets/icons/close.svg";

function NavMenu() {
    const { checkUser, userDto, sideNav, setSideNav, showLogin, setShowLogin,setShowRegister,setShowForgotPassword } = useAppProvider();

    const navigate = useNavigate();
    const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const response = await fetch("/api/account/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                checkUser();
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogin = () => {
        setSideNav(false);
        setShowForgotPassword(false);
        setShowRegister(false);
        setShowLogin(true);
    }

    return (
        <>
            

            <nav className={styles.navbar}>
                <img className={styles.navIcon} onClick={() => setSideNav(!sideNav)} src={menuIcon}></img>
                <Link to={"/"}>
                    <img className={styles.logo} src={logo}>
                    </img>
                </Link>
                <img className={styles.navIcon} src={cart}></img>
            </nav>

            <div className={styles.sideNav} style={{ width: `${sideNav ? "210px" : "0"}` }}>
                <button onClick={() => setSideNav(!sideNav)} className={styles.closebtn}>
                    <img className={styles.navIcon} src={close}></img>
                </button>
                <section className={styles.navLinks}>
                    <div className="">
                        <NavLink onClick={() => setSideNav(!sideNav)} to={"/"} className={({ isActive }) => isActive ? `${styles.navLinkMain} ${styles.active}` : styles.navLinkMain}>
                            <span className="" aria-hidden="true"></span> Home
                        </NavLink>
                    </div>

                    <ProtectedRoute>
                        <div className="">
                            <NavLink onClick={() => setSideNav(!sideNav)} className={({ isActive }) => isActive ? `${styles.navLinkMain} ${styles.active}` : styles.navLinkMain} to={"Account/Manage"}>
                                <span className="" aria-hidden="true"></span>{userDto.nickName ?? userDto.userName}
                            </NavLink>
                        </div>
                        <div className="">
                            <form onSubmit={handleLogout}>
                                <button type="submit" className="nav-link-main">
                                    <span className="" aria-hidden="true"></span> Logout
                                </button>
                            </form>
                        </div>
                    </ProtectedRoute>

                    <PublicRoute>
                        <span className={styles.loginBtn} onClick={handleLogin} aria-hidden="true">
                            Profil
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
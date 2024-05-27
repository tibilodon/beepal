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
    const { checkUser, userDto, sideNav, setSideNav, showLogin, setShowLogin } = useAppProvider();

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
                    <div className="nav-item px-3">
                        <NavLink onClick={() => setSideNav(!sideNav)} to={"/"} className={({ isActive }) => isActive ? "nav-link-main active" : "nav-link-main"}>
                            <span className="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Home
                        </NavLink>
                    </div>

                    <ProtectedRoute>
                        <div className="nav-item px-3">
                            <NavLink onClick={() => setSideNav(!sideNav)} className={({ isActive }) => isActive ? "nav-link-main active" : "nav-link-main"} to={"Account/Manage"}>
                                <span className="bi bi-person-fill-nav-menu" aria-hidden="true"></span>{userDto.nickName ?? userDto.userName}
                            </NavLink>
                        </div>
                        <div className="nav-item px-3">
                            <form onSubmit={handleLogout}>
                                <button type="submit" className="nav-link-main">
                                    <span className="bi bi-arrow-bar-left-nav-menu" aria-hidden="true"></span> Logout
                                </button>
                            </form>
                        </div>
                    </ProtectedRoute>

                    <PublicRoute>
                        <span className={styles.loginBtn} onClick={handleLogin} aria-hidden="true">
                            Login
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
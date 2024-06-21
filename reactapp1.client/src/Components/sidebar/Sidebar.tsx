import styles from "./sidebar.module.css";
import { useAppProvider } from "../../Context/AppContext";
import { NavLink } from "react-router-dom";
import PublicRoute from "../utils/PublicRoute";

import close from "../../assets/icons/close.svg";
import Gimmick from "../gimmick/Gimmick";

function Sidebar() {
  const {
    sideNav,
    setSideNav,
    setShowForgotPassword,
    setShowRegister,
    setShowLogin,
  } = useAppProvider();
  const handleLogin = () => {
    setSideNav(false);
    setShowForgotPassword(false);
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <>
      <div
        className={styles.sideNav}
        style={{ width: `${sideNav ? "210px" : "0"}` }}
      >
        <button
          onClick={() => setSideNav(!sideNav)}
          className={styles.closebtn}
        >
          <img className={styles.navIcon} src={close}></img>
        </button>
        <section className={styles.navLinks}>
          <NavLink
            onClick={() => setSideNav(!sideNav)}
            to={"/"}
            className={({ isActive }) =>
              isActive ? "navLinkMain active" : "navLinkMain"
            }
          >
            Főoldal
          </NavLink>

          <NavLink
            onClick={() => setSideNav(!sideNav)}
            to={"/products"}
            className={({ isActive }) =>
              isActive ? "navLinkMain active" : "navLinkMain"
            }
            end
          >
            Termékek
          </NavLink>

          <PublicRoute>
            <span
              className={styles.loginBtn}
              onClick={handleLogin}
              aria-hidden="true"
            >
              Belépés
            </span>
          </PublicRoute>
        </section>
        <div className={styles.gimmick}>
          <Gimmick />
        </div>
      </div>
    </>
  );
}

export default Sidebar;

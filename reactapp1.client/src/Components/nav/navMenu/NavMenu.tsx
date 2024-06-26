import styles from "./navMenu.module.css";
import { Link, useLocation } from "react-router-dom";

import menuIcon from "../../../assets/icons/menu.svg";
import logo from "../../../assets/images/logo.png";

import { useAppProvider } from "../../../Context/AppContext";
import ManageUser from "../../popup/ManageUser/ManageUser";
import CartNavIcon from "../../cart/navIcon/CartNavIcon";
import Sidebar from "../../sidebar/Sidebar";
import CartSidebar from "../../cart/cartSidebar/CartSidebar";
import { useEffect, useState } from "react";

function NavMenu() {
  const location = useLocation();
  const { sideNav, setSideNav, resetShowStates } = useAppProvider();

  function handleToggle() {
    resetShowStates();
    setSideNav(!sideNav);
  }

  const [hideCart, setHideCart] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/cart") {
      setHideCart(true);
    } else {
      setHideCart(false);
    }
  }, [location]);

  return (
    <>
      <nav className={styles.navbar}>
        <img
          className={styles.navIcon}
          onClick={handleToggle}
          src={menuIcon}
        ></img>
        <Link onClick={resetShowStates} to={"/"}>
          <img className={styles.logo} src={logo}></img>
        </Link>
        <div className={styles.user}>
          <ManageUser />
          {!hideCart ? <CartNavIcon /> : null}
        </div>
      </nav>
      <Sidebar />
      <CartSidebar />
    </>
  );
}

export default NavMenu;

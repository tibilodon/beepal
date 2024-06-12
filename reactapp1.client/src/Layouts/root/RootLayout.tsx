import { Outlet } from "react-router-dom";
import NavMenu from "../../Components/nav/navMenu/NavMenu";
import styles from "./rootLayout.module.css";

import Loader from "../../Components/Loader/Loader";
import { useAppProvider } from "../../Context/AppContext";

function RootLayout() {
  const { isLoading } = useAppProvider();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.navbar}>
          <NavMenu />
        </div>
        <section className={styles.content}>
          <Outlet />
        </section>
      </div>
    </>
  );
}

export default RootLayout;

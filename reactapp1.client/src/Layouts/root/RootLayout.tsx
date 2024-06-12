import { Outlet } from "react-router-dom";
import NavMenu from "../../Components/nav/navMenu/NavMenu";
import styles from "./rootLayout.module.css";
import { useNavigation } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

function RootLayout() {
  const navigation = useNavigation();
  if (navigation.state === "loading") {
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

import { Outlet, useLoaderData } from "react-router-dom";
import NavMenu from "../../Components/nav/navMenu/NavMenu";
import styles from "./rootLayout.module.css";
import { useNavigation } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { RootLayoutUseLoaderData } from "../../Helpers/Types/commonTypes";
import { useAppProvider } from "../../Context/AppContext";
import { useEffect } from "react";

function RootLayout() {
  const navigation = useNavigation();
  const { setUserDto, setIsLoggedIn } = useAppProvider();
  const { isLoggedIn, userDto } = useLoaderData() as RootLayoutUseLoaderData;

  useEffect(() => {
    if (userDto) {
      setUserDto(userDto);
    }

    setIsLoggedIn(isLoggedIn);
    console.log("rootlayout useEffect ran");
  }, [setIsLoggedIn, isLoggedIn, setUserDto, userDto]);

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

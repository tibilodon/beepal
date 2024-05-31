import { Outlet } from "react-router-dom";
import NavMenu from "../../Components/nav/navMenu/NavMenu";
import styles from "./rootLayout.module.css"


function RootLayout() {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.navbar}>
                    <NavMenu/>
                    {/*<a className={styles.secondaryRow} href="https://learn.microsoft.com/aspnet/core/" target="_blank">check this out</a>*/}
                </div>
                <section className={styles.content}>
                    <Outlet />
                </section>


            </div>
        </>
    );
}

export default RootLayout;
import { Outlet } from "react-router-dom";
import ManageNavMenu from "../../Components/nav/manageNavMenu/ManageNavMenu";
import styles from "./manageLayout.module.css";
import ProtectedRoute from "../../Components/utils/ProtectedRoute";



function ManageLayout() {
    return (
        <>
            <ProtectedRoute>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <h1>Profil adatai</h1>
                    {/*<h2>Change your account settings</h2>*/}
                </header>

                <hr />
                <div className={styles.content}>
                    <section className={styles.navbar}>
                        <ManageNavMenu />
                    </section>
                    <section className={styles.outlet}>
                        <Outlet />
                    </section>
                </div>

            </div>
            </ProtectedRoute>
        </>
    );
}

export default ManageLayout;
import ProtectedRoute from "../../utils/ProtectedRoute";
import styles from "./manageUser.module.css";
import user from "../../../assets/icons/user.svg";

import { useState } from "react";
import { useAppProvider } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import ButtonA from "../../buttons/ButtonA";

function ManageUser() {
    const navigate = useNavigate();



    const { checkUser, resetShowStates, userDto, showManageUser, setShowManageUser } = useAppProvider();

    const { userName, email, nickName } = userDto

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
                await checkUser();
                resetShowStates();
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handlePopUp() {
        setShowManageUser(!showManageUser);
    };

    return (
        <div className={styles.wrap}>
            <ProtectedRoute>
                <img onClick={handlePopUp} className={styles.userIcon} src={user}></img>
                {showManageUser &&
                    <div className={styles.popUp}>
                        <section className={styles.heroSection}>
                            <span>{Array.from(userName)[0]}</span>
                            <ul className={styles.details}>
                                <li>joseph.smiasdasdthysdasdasdasds@yahoo.co.uk</li>
                                {/*<li>{userName}</li>*/}
                                <li>{email}</li>
                                <li>{nickName}</li>
                            </ul>
                        </section>
                        <hr />
                        <ButtonA type="button" label="Profilom" />
                        <form onSubmit={handleLogout}>

                            <ButtonA type="submit" label="Kijelentkezés" />
                        </form>

                    </div>
                }
            </ProtectedRoute>

        </div>
    );
}

export default ManageUser;
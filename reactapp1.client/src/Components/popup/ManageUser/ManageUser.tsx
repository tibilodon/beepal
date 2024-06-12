import ProtectedRoute from "../../utils/ProtectedRoute";
import styles from "./manageUser.module.css";
import user from "../../../assets/icons/user.svg";

import { useAppProvider } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import ButtonA from "../../buttons/ButtonA";
import { initialUserDto } from "../../../Context/AppContext";

function ManageUser() {
  const navigate = useNavigate();

  const {
    checkUser,
    resetShowStates,
    userDto,
    setUserDto,
    showManageUser,
    setShowManageUser,
    setIsLoggedIn,
  } = useAppProvider();

  const { userName, email, nickName } = userDto;

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
        setIsLoggedIn(false);
        setUserDto(initialUserDto);
        resetShowStates();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleToggle() {
    resetShowStates();
    setShowManageUser(!showManageUser);
  }

  function handleClick() {
    setShowManageUser(false);
    navigate("/account/manage");
  }

  return (
    <ProtectedRoute>
      <img onClick={handleToggle} className={styles.userIcon} src={user}></img>

      <div
        className={styles.content}
        style={{ height: `${showManageUser ? "310px" : "0"}` }}
      >
        <div className={styles.popUp}>
          <section className={styles.heroSection}>
            <span>{Array.from(userName)[0]}</span>
            <ul className={styles.details}>
              {/*<li>{userName}</li>*/}
              <li>{email}</li>
              <li>{nickName}</li>
            </ul>
          </section>
          <hr />
          <ButtonA type="button" label="Adataim" onClick={handleClick} />
          <form onSubmit={handleLogout}>
            <ButtonA color="danger" type="submit" label="Kijelentkezés" />
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default ManageUser;

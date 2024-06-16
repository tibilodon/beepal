import { NavLink } from "react-router-dom";
// import ButtonA from "../../buttons/ButtonA";
import styles from "./adminNav.module.css";
function AdminNav() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.wrap}>
          <span>
            <li>
              <NavLink
                to={"/admin"}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                end
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/add"}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                end
              >
                Add Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/orders"}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                end
              >
                Orders
              </NavLink>
            </li>
          </span>
          <span>
            <li>
              <NavLink
                to={"/admin/stats"}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
                end
              >
                Statistics
              </NavLink>
            </li>
          </span>
        </ul>
      </nav>
    </>
  );
}

export default AdminNav;

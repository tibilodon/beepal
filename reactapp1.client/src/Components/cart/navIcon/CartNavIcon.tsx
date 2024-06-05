import styles from "./cartNavIcon.module.css";
import icon from "../../../assets/icons/cart.svg";
function CartNavIcon() {
  return (
    <>
      <div className={styles.wrap}>
        <img src={icon}></img>
        <span className={styles.quantity}>
          <p>15</p>
        </span>
      </div>
    </>
  );
}

export default CartNavIcon;

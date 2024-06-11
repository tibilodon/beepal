import styles from "./cartNavIcon.module.css";
import icon from "../../../assets/icons/cart.svg";
// import { GetCartItems } from "../../../Helpers/cookieFetch/cookieFetcher";
import { useAppProvider } from "../../../Context/AppContext";
function CartNavIcon() {
  const { showCartSidebar, setShowCartSidebar, cartCounter, resetShowStates } =
    useAppProvider();

  const handleToggle = () => {
    resetShowStates();
    setShowCartSidebar(!showCartSidebar);
  };
  return (
    <>
      <div onClick={handleToggle} className={styles.wrap}>
        <img src={icon}></img>
        {cartCounter > 0 && (
          <span className={styles.quantity}>
            <p>{cartCounter}</p>
          </span>
        )}
      </div>
    </>
  );
}

export default CartNavIcon;

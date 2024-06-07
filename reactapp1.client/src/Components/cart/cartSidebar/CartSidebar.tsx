import styles from "./cartSidebar.module.css";
import { useAppProvider } from "../../../Context/AppContext";
import close from "../../../assets/icons/close.svg";
import {
  GetCartItems,
  AddItemToCart,
} from "../../../Helpers/cookieFetch/cookieFetcher";
import { CartItem } from "../../../Helpers/Types/commonTypes";

function CartSidebar() {
  const { showCartSidebar, setShowCartSidebar, checkCartItems } =
    useAppProvider();

  const fixValue: CartItem = {
    Id: "fixval id test",
    Name: "fixval",
    Quantity: 2,
    Variant: "same but different",
  };

  const handleAdd = () => {
    AddItemToCart(fixValue);
  };

  return (
    <>
      <div
        className={styles.sideNav}
        style={{ width: `${showCartSidebar ? "300px" : "0"}` }}
      >
        <button
          onClick={() => setShowCartSidebar(!showCartSidebar)}
          className={styles.closebtn}
        >
          <img className={styles.navIcon} src={close}></img>
        </button>
        <section className={styles.navLinks}>
          <p onClick={GetCartItems}>get cookies</p>
          <p onClick={handleAdd}>set fix value</p>
          <p onClick={checkCartItems}>refresh</p>
        </section>
      </div>
    </>
  );
}

export default CartSidebar;

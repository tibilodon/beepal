import styles from "./cartSidebar.module.css";
import { useAppProvider } from "../../../Context/AppContext";
import close from "../../../assets/icons/close.svg";
import CartItemCard from "../../cards/cartItemCard/CartItemCard";

function CartSidebar() {
  const { showCartSidebar, setShowCartSidebar, cartItems } = useAppProvider();

  return (
    <>
      <div
        className={styles.sideNav}
        style={{
          width: `${showCartSidebar ? "300px" : "0"}`,
        }}
      >
        <div className={styles.header}>
          <h3>Kosár</h3>
          <button
            onClick={() => setShowCartSidebar(!showCartSidebar)}
            className={styles.closebtn}
          >
            <img src={close}></img>
          </button>
        </div>
        <section className={styles.navLinks}>
          {cartItems.map((product, index) => {
            return <CartItemCard key={product.id + index} product={product} />;
          })}
        </section>
        <footer className={styles.footer}>Végösszeg:</footer>
      </div>
    </>
  );
}

export default CartSidebar;

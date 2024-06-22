import styles from "./cartSidebar.module.css";
import { useAppProvider } from "../../../Context/AppContext";
import close from "../../../assets/icons/close.svg";
import CartItemCard from "../../cards/cartItemCard/CartItemCard";
import WhiteSpace from "../../utils/WhiteSpace";
import ButtonA from "../../buttons/ButtonA";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../emptyCart/EmptyCart";

function CartSidebar() {
  const navigate = useNavigate();
  const {
    showCartSidebar,
    setShowCartSidebar,
    cartItems,
    totalAmount,
    resetShowStates,
  } = useAppProvider();

  function handleNavigation(href: string) {
    resetShowStates();
    navigate(href);
  }

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
        {cartItems.length ? (
          <>
            <section className={styles.navLinks}>
              {cartItems.map((product, index) => {
                return (
                  <CartItemCard key={product.id + index} product={product} />
                );
              })}
            </section>
            <footer className={styles.footer}>
              <span>
                Végösszeg:
                <WhiteSpace />
                {totalAmount} Ft
              </span>

              <ButtonA
                label="Kosár megtekintése"
                color="basic"
                onClick={() => handleNavigation("/cart")}
              />

              <ButtonA label="Pénztár" color="success" />
            </footer>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
}

export default CartSidebar;

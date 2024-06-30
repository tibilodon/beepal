import { useAppProvider } from "../../Context/AppContext";
import styles from "./checkout.module.css";
import logo from "../../assets/images/logo.png";
import cart from "../../assets/icons/cart.svg";
import PlainCartItemCard from "../../Components/cards/cartItemCard/PlainCartItemCard";
import { Link } from "react-router-dom";
import Input from "../../Components/form/input/Input";
import { useState } from "react";
import ExpandCartItems from "../../Components/cart/expandCartItems/ExpandCartItems";

function Checkout() {
  const { cartItems, totalAmount, cartCounter } = useAppProvider();
  const [expand, setExpand] = useState<boolean>(false);
  const [formData, setFormData] = useState();
  return (
    <>
      <div className={styles.wrap}>
        <span className={`${styles.flexRow} ${styles.alignItemsCenter}`}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="logo icon" />
          </Link>
          <Link to="/cart">
            <img className={styles.cartIcon} src={cart} alt="cart icon" />
          </Link>
        </span>

        <section className={`${styles.flewCol} ${styles.lighterBackground}`}>
          <span className={`${styles.flexRow} ${styles.noPadding}`}>
            <ExpandCartItems
              expand={expand}
              setExpand={setExpand}
              products={cartItems}
              totalAmount={totalAmount}
            />
            {/* <p>{totalAmount} Ft</p> */}
          </span>

          {/* <Input placeholder="E-mail cím" id="email" type="email" value={""} /> */}
        </section>

        <section className={styles.flexCol}>
          <h3>Szállítási mód</h3>
          <p>utónév</p>
          <p>vezetéknév</p>
          <p>irányítószám</p>
          <p>település</p>
          <p>cím</p>
          <p>épület, emelet, ajtó, stb nem kötelező beírni</p>
          <p>telefonszám</p>
        </section>

        <section className={styles.flexCol}>
          <span className={styles.flexRow}>
            <h3>Rendelés összegzése: counter</h3>
            <p>megjelenítés</p>
          </span>
          <span className={styles.flexRow}>
            <p>input kedvezményKód</p>
            <button>beváltás</button>
          </span>
          <span className={styles.flexRow}>
            <p>részösszeg</p>
            <p>{totalAmount} Ft</p>
          </span>
          <span className={styles.flexRow}>
            <p>szállítás</p>
            <p>xxx Ft</p>
          </span>
          <span className={styles.flexRow}>
            Végösszeg: totalAmount + shipping fee
          </span>
          <button>rendelés összege</button>
        </section>

        <section>
          <p>Visszatérítési szabályzat</p>
          <p>Szállítási szabályzat</p>
          <p>Adatvédelmi szabályzat</p>
          <p>Szolgáltatási feltételek</p>
          <p>Jogi közlemény</p>
          <p>Kapcsolattartási adatok</p>
        </section>
      </div>
    </>
  );
}
export default Checkout;

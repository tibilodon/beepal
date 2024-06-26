import styles from "./cart.module.css";

import ButtonA from "../../Components/buttons/ButtonA";
import { useAppProvider } from "../../Context/AppContext";

import CartPageCard from "../../Components/cards/cartPageCard/CartPageCard";
import { Link } from "react-router-dom";

//  TODO: swap delete icon to value selector
function Cart() {
  const { cartItems } = useAppProvider();
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("cool");
  }
  return (
    <>
      <div className={styles.wrap}>
        {cartItems.map((item, index) => {
          return (
            <section key={item.id + index}>
              <CartPageCard product={item} />
            </section>
          );
        })}

        <Link to={"/"}>
          <ButtonA label="Vásárlás folytatása" color="success" />
        </Link>
        <section>
          <p>
            Az ár tartalmazza az ÁFÁ-t. A szállítás díja a pénztár oldalon kerül
            kiszámításra.
          </p>
          <span>
            <h3>Összesen: </h3>
            <h3>PRICE</h3>
          </span>
          <form onSubmit={submitHandler}>
            <label htmlFor="tnc">
              Kijelentem, hogy az ÁSZF-et elolvastam és elfogadom. A megadott
              adataim a valóságnak megfelelnek.
            </label>
            <input type="checkbox" id="tnc" />
            <ButtonA type="submit" label="Pénztár" color="basic" />
          </form>
        </section>
      </div>
    </>
  );
}

export default Cart;

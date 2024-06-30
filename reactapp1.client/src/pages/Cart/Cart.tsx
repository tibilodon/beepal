import styles from "./cart.module.css";

import ButtonA from "../../Components/buttons/ButtonA";
import { useAppProvider } from "../../Context/AppContext";

import CartPageCard from "../../Components/cards/cartPageCard/CartPageCard";
import { Link, useNavigate } from "react-router-dom";
import EmptyCart from "../../Components/cart/emptyCart/EmptyCart";
import { useState } from "react";

//  TODO: add recommended products for more content

function Cart() {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useAppProvider();
  const [tnc, setTnc] = useState(false);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //  piece of mind
    if (tnc) {
      navigate("/checkout");
    }
  }

  return (
    <>
      {cartItems.length ? (
        <div className={styles.wrap}>
          <h1>Kosár</h1>
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
          <section className={styles.details}>
            <p>
              Az ár tartalmazza az ÁFÁ-t. A szállítás díja a pénztár oldalon
              kerül kiszámításra.
            </p>
            <span>
              <h3 className={styles.totalAmount}>Összesen: {totalAmount} Ft</h3>
            </span>
            <form onSubmit={submitHandler}>
              <span className={styles.tnc}>
                <input
                  type="checkbox"
                  id="tnc"
                  name="tnc"
                  checked={tnc}
                  onChange={() => setTnc(!tnc)}
                />
                <label htmlFor="tnc">
                  Kijelentem, hogy az{" "}
                  <Link className={styles.tncLink} to={"/tnc"}>
                    ÁSZF-et
                  </Link>{" "}
                  elolvastam és elfogadom. A megadott adataim a valóságnak
                  megfelelnek.
                </label>
              </span>
              <ButtonA
                disabled={!tnc}
                type="submit"
                label="Pénztár"
                color="basic"
              />
            </form>
          </section>
        </div>
      ) : (
        <div className={styles.emptyWrap}>
          <EmptyCart />
        </div>
      )}
    </>
  );
}

export default Cart;

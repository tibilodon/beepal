import styles from "./cart.module.css";
import CartItemCard from "../../Components/cards/cartItemCard/CartItemCard";
import ButtonA from "../../Components/buttons/ButtonA";

//  TODO: swap delete icon to value selector
function Cart() {
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("cool");
  }
  return (
    <>
      <div className={styles.wrap}>
        <header>
          <h3>Termék</h3>
          <h3>Mennyiség</h3>
        </header>
        <section>
          <h1>CARTITEM</h1>
        </section>
        <div>
          <ButtonA label="Vásárlás folytatása" color="success" />
        </div>
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

import styles from "@/styles/basket.module.scss";
import icon from "@/assets/emptyCart.svg";
import Image from "next/image";
import { cookies } from "next/headers";

interface BasketProps {
  vals?: {
    name: string;
    value: any;
  };
}

const Basket: React.FC<BasketProps> = () => {
  const nextCookies = cookies();

  const acacia: any = nextCookies.get("acacia");
  const colza: any = nextCookies.get("colza");
  const mixed: any = nextCookies.get("mixed");

  //all items in cart
  let cartItems: number = 0;
  let acaciaValue: number = 0;
  let colzaValue: number = 0;
  let mixedValue: number = 0;
  if (acacia) {
    acaciaValue = Number(acacia.value);
  }

  if (colza) {
    colzaValue = Number(colza.value);
  }
  if (mixed) {
    mixedValue = Number(mixed.value);
  }
  cartItems = acaciaValue + colzaValue + mixedValue;
  //price of those items
  let acaciaAmount = acaciaValue * 4000;
  let colzaAmount = colzaValue * 3500;
  let mixedAmount = mixedValue * 3000;
  let allValue = acaciaAmount + colzaAmount + mixedAmount;
  return (
    <>
      <button className={styles.wrap}>
        <Image alt="cart icon" src={icon} />

        {cartItems >= 1 ? (
          <p className={styles.quantity}>{cartItems}</p>
        ) : (
          <p>Kosár</p>
        )}
        {allValue >= 1 && <p className={styles.amount}>{allValue} Ft</p>}
      </button>
    </>
  );
};

export default Basket;

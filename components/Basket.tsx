import styles from "@/styles/basket.module.scss";
import icon from "@/assets/emptyCart.svg";
import Image from "next/image";
import { cookies } from "next/headers";

interface BasketProps {
  amount: number;
  // quantity: any;
}

const Basket = () => {
  const nextCookies = cookies();

  const vals = nextCookies.get("acacia");

  return (
    <>
      <button className={styles.wrap}>
        <Image alt="cart icon" src={icon} />

        {vals && vals.value >= 1 ? (
          <p className={styles.quantity}>{vals.value || 1}</p>
        ) : (
          <p>Kosár</p>
        )}
        {vals && vals.value >= 1 && <p className={styles.amount}>{242} Ft</p>}
      </button>
    </>
  );
};

export default Basket;

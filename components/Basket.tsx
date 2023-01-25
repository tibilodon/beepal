import styles from "@/styles/basket.module.scss";
import icon from "@/assets/emptyCart.svg";
import Image from "next/image";
import { cookies } from "next/headers";

interface BasketProps {
  vals?: {
    name: string;
    value: any;
  };
  // quantity: any;
}

const Basket: React.FC<BasketProps> = () => {
  const nextCookies = cookies();

  const vals = nextCookies.get("acacia");

  const amount = Number(vals.value) * 3000;

  return (
    <>
      <button className={styles.wrap}>
        <Image alt="cart icon" src={icon} />

        {vals && Number(vals.value) >= 1 ? (
          <p className={styles.quantity}>{Number(vals.value) || 1}</p>
        ) : (
          <p>Kosár</p>
        )}
        {vals && Number(vals.value) >= 1 && (
          <p className={styles.amount}>{amount} Ft</p>
        )}
      </button>
    </>
  );
};

export default Basket;

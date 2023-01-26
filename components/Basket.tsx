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

  const acacia: any = nextCookies.get("acacia");
  const colza: any = nextCookies.get("colza");
  const mixed: any = nextCookies.get("mixed");

  const quantity = (acacia: any, colza: any, mixed: any): void => {
    let amount;
    if (acacia) amount = Number(acacia.value);
  };

  const vals: any = nextCookies.get("acacia");

  let amount;
  if (vals) {
    amount = Number(vals.value) * 3000;
  }

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
